
var jso = {

  "labels": [
    {
      "LabelName": "kitten",
      "confidence": "0.3615228831768036"
    },
    {
      "LabelName": "cat",
      "confidence": "0.997473955154419"
    },
    {
      "LabelName": "whiskers",
      "confidence": "0.3001704514026642"
    },
    {
      "LabelName": "animal",
      "confidence": "0.9441419243812561"
    },
    {
      "LabelName": "pet",
      "confidence": "0.8389395475387573"
    },
    {
      "LabelName": "tabby cat",
      "confidence": "0.30844953656196594"
    },
    {
      "LabelName": "small to medium sized cats",
      "confidence": "0.7987512946128845"
    },
    {
      "LabelName": "maine coon",
      "confidence": "0.32171761989593506"
    }
  ]
}


var jsonVeri = JSON.stringify(jso);
var veri = JSON.parse(jsonVeri);

console.log(veri.labels[0].confidence);