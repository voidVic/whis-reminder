const brainJSClassifier = require('natural-brain');

let mainClassifier = new brainJSClassifier();

const trainData = () => {
    const blockActionDataLength = data.blockAction.length;
    for (let i = 0; i < blockActionDataLength; i++) {
        mainClassifier.addDocument(data.blockAction[i].q, data.blockAction[i].a);
    }
    mainClassifier.train();
}
trainData();


function processMessage(message, cb) {

}

module.exports = {
    processMessage
}
