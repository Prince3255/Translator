const Et1 = document.querySelector('#Et1')
const Tt2 = document.querySelector('#Tt2')
const select1 = document.querySelectorAll('select')
const btn = document.querySelector('button')
const TRI = document.querySelector('.TRI')
const Icons = document.querySelectorAll('#Icons');
console.log(Icons)

select1.forEach((element,id) => {
for (const country_code in countries) {
    let selected;
    if(id == 0 && country_code == "en-GB") {
        selected = "selected"
    }
    else if (id == 1 && country_code == "hi-IN") {
        selected = "selected"
    }
    let country = `<option value=${country_code} ${selected}>${countries[country_code]}</option>`
    element.insertAdjacentHTML('beforeend',country)
} 
});

btn.addEventListener('click', ()=>{
    let value = Et1.value;
    let translateFrom = select1[0].value
    let translateTo = select1[1].value
    if (!value) return;
    Tt2.setAttribute("placeholder" , "Translating..")
    let url = `https://api.mymemory.translated.net/get?q=${value}&langpair=${translateFrom}|${translateTo}`
    fetch(url).then(res => res.json()).then(data => {
        Tt2.value = data.responseData.translatedText
        Tt2.setAttribute("placeholder" , "Translation")
    })
})

TRI.addEventListener('click',()=>{
    let temp = select1[0].value;
    select1[0].value = select1[1].value;
    select1[1].value = temp;

    let temp1 = Tt2.value;
    Tt2.value = Et1.value;
    Et1.value = temp1;
})

Icons.forEach(icon => {
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains('ri-file-copy-fill')) {
            if(target.id == "from") {
                navigator.clipboard.writeText(Et1.value)
            }
            else {
                navigator.clipboard.writeText(Tt2.value)
            }
        }
        else {
            let speak;
            if(target.id == "from") {
                speak = new SpeechSynthesisUtterance(Et1.value) // speechsynthesisutterance represent speech request
                speak.lang = select1[0].value;
            }
            else {
                speak = new SpeechSynthesisUtterance(Tt2.value)
                console.log(select1[1].value)
                speak.lang = select1[1].value;
            }
            speechSynthesis.speak(speak);
        }
    })
})
