import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import * as tf from '@tensorflow/tfjs'
const tfn = require('@tensorflow/tfjs-node')
/*ToDo:

1. Import model and get tokenizer available
2. Pre-Process the data
3. Tokenize the data
4. Convert Text to sequences
5. Pad the sequences
6. Print the Predicted value
7. Highlist emoji based on emotion score
*/
const PAD_INDEX = 0
const OOV_INDEX = 0
let model, word_dict;
let text = "I am joyful";
export async function getEmotionScore(post){
    // A simple model
    // const xs = tf.tensor2d([1,2,3,4,5],[5,1])
    // const ys = tf.tensor2d([1,3,5,7,9],[5,1])

    // const model = tf.sequential();
    // model.add(tf.layers.dense({units:1,inputShape:[1]}))
    // model.compile({loss:'meanSquaredError',optimizer:'sgd'});
    // model.fit(xs,ys,{epochs:10}).then(() => {
    //     model.predict(tf.tensor2d([6],[1,1])).print()
    // })
    let score = await processData(post)
    return score;
}
async function getModel(){
    if(typeof model == 'undefined'){
        const modelDirectory = path.join(process.cwd(),'model');
        const modelPath = path.join(modelDirectory,'model.json');
        const handler = tfn.io.fileSystem(modelPath);
        model = await tf.loadLayersModel(handler);
    }
    if(typeof word_dict == 'undefined'){
        const modelDirectory = path.join(process.cwd(),'model');
        const dictPath = path.join(modelDirectory,'word_dict.json');
        const dictLookup = fs.readFileSync(dictPath,'utf-8');
        word_dict = JSON.parse(dictLookup);
    }
}
async function processData(post){
    await getModel()
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory,`${post}.md`);
    const fileContents = fs.readFileSync(fullPath,'utf8')
    const matterResult = matter(fileContents);
    const val = matterResult.content.split('.');
    let emotion = {anger:0,fear:0,joy:0,sad:0}
    let totalSentences = 0;
    val.forEach(sentence => {
        const score = getSentimentScore(sentence)
        emotion.anger += score[0]
        emotion.fear += score[1]
        emotion.joy += score[2]
        emotion.sad += score[3]
        totalSentences += 1;
    });
    console.log("===============");
    console.log("Total Sentences: "+ totalSentences)
    Object.entries(emotion).forEach(([key,value]) => {
        let score_val = value/totalSentences;
        emotion[key] = score_val.toFixed(4)
        console.log(key + " : " + score_val.toFixed(4))
    });
    return emotion;
}
function sortByScore(score){
  const sortable = Object.fromEntries(
      Object.entries(score).sort(([,a],[,b]) => b-a)
  )
  return sortable;
}
export function getOpacityAndFilterByRank(score){
  const opacityByRank=[1,0.8,0.5,0.5];//1 is visible and 0 is invisible
  const filterByRank = [0,0.5,0.8,1];//0 is color and 1 is gray
  let sortedScore = sortByScore(score);
  const emotionByRank = {};
  Object.entries(sortedScore).forEach(([key,value],index) => {
    emotionByRank[key] = {'opacity':opacityByRank[index],'filter':filterByRank[index]}
  })
  return emotionByRank;
}
function getSentimentScore(text){
    const sequence = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    //convert the word to a sequence of word indices
    const tokenized_sequence = sequence.map(word => {
        let wordIndex = word_dict[word];
        if (wordIndex > 10000) {
            wordIndex = OOV_INDEX;
        }else if(wordIndex == undefined){
            wordIndex = OOV_INDEX;
        }
        return wordIndex;
    })
    let zero_ctr = 0
    tokenized_sequence.forEach(ele => {
        if(ele == 0)
            zero_ctr += 1
    })
    const paddedSequence = padSequences([tokenized_sequence],100)
    const input = tf.tensor2d(paddedSequence,[1,100])
    /*console.log("Word Dictionary size:" + Object.keys(word_dict).length)
    console.log("Total Input Words:" +  sequence.length)
    console.log("Tokenized Words:" + tokenized_sequence.length)
    console.log("Unrecognized words:" + zero_ctr);
    console.log("Padding size:" + paddedSequence[0].length)
    console.log("Input shape:" + input.shape)*/
    const output = model.predict(input);
    const score = output.dataSync();
    return score;
}
function padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) {
    return sequences.map(seq => {
      if (seq.length > maxLen) {
        if (truncating === 'pre') {
          seq.splice(0, seq.length - maxLen);
        } else {
          seq.splice(maxLen, seq.length - maxLen);
        }
      }

      if (seq.length < maxLen) {
        const pad = [];
        for (let i = 0; i < maxLen - seq.length; ++i) {
          pad.push(value);
        }
        if (padding === 'pre') {
          seq = pad.concat(seq);
        } else {
          seq = seq.concat(pad);
        }
      }

      return seq;
    });
  }
