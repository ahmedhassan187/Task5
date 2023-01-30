const realInputBtn = document.getElementById ("real-input");
const customeBtn = document.getElementById ("custome_button");
const customText = document.getElementById ("custom-text");
pad =document.getElementById('pad')
signal = []
x_s = [0]
x_val = 0
custome_button.addEventListener("click", function(){
    realInputBtn.click();
})

realInputBtn.addEventListener("change", function(){
    if (realInputBtn.value){
        customText.innerHTML=realInputBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    }
    else{
        customText.innerHTML="No file chosen"
    }
})

document.getElementById("btn_3").onclick = function () {
    location.href = "/catalog";
};
document.getElementById("btn_1").onclick = function () {
    var xhr = new XMLHttpRequest();
var JSON_sent = {signal};
xhr.open('POST', '/filter', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON_sent['signal'])
        console.log(JSON.parse(xhr.response))
        Plotly.newPlot('mag-plot', [{
            x: x_s,
            // هنا اللقطة انك تباصي الy الجديد بعد الفترة 
            // انا هنا ضربت ف الجافاسكريبت
            y: JSON.parse(xhr.response).map(function(x) { return x; }),
           type: 'scatter'
        }]);
        
    } else {
        console.log(xhr.responseText);
    }
    };
    xhr.send(JSON.stringify(JSON_sent));
};
const gen = document.getElementById('pad');
gen.addEventListener("mousemove", (event) => {
    event.preventDefault();
    update_graph(event.clientX);
    var xhr = new XMLHttpRequest();
    var JSON_sent = {signal};
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON_sent['signal'])
            console.log(JSON.parse(xhr.response))
            Plotly.newPlot('output-plot', [{
                x: x_s,
                // هنا اللقطة انك تباصي الy الجديد بعد الفترة 
                // انا هنا ضربت ف الجافاسكريبت
                y: JSON.parse(xhr.response).map(function(x) { return x; }),
               type: 'scatter'
            }]);
            
        } else {
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(JSON_sent));
  });
function update_graph(x) {
    signal.push(x);
    x_val ++;
    x_s.push(x_val);
    if (x_s.length > 100) {
        x_s.shift();
        signal.shift();
    }
    Plotly.newPlot('live-plot', [{
        x: x_s,
        y: signal,
        type: 'scatter'
    }]);

}
