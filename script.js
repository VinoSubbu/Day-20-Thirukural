let container = document.createElement('div');
container.setAttribute('class', 'content');

let container1 = document.createElement('div');
container1.setAttribute('class', 'detail');

let kuralcontainer = document.createElement('div');

let bootcontainer = document.querySelector('.outer');
bootcontainer.append(kuralcontainer, container);

let meancontain = document.createElement('div');
meancontain.setAttribute('class', 'meaning');

async function search() {
    try {
        let x = document.getElementById("myText").value || 1;
        document.getElementById("myText").value = x;
        const kuralid = await fetch("https://api-thirukkural.vercel.app/api?num=" + x);
        const result = await kuralid.json();
        container1.innerHTML = ``;
        details(result);
    } catch (error) {
        console.log("fetch error in search", error);
    }
}

function details(result) {
    // Kural Container
    kuralcontainer.setAttribute('class', 'kuraldiv');
    kuralcontainer.innerHTML = `
    <h4 class="kural1 tamil">${result.number}."${result.line1}"</h4>
    <h4 class="kural2 tamil">${result.line2}"</h4>`;
    
    // Details
    container1.innerHTML = `
    <h5 class="tamil">அதிகாரம் : <small>${result.chap_tam}</small></h5>
    <h5 class="tamil">பால் : <small>${result.sect_tam}</small></h5>
    <h5 class="tamil">இயல் : <small>${result.chapgrp_tam}</small></h5>`;
    
    // Meaning Container
    meancontain.innerHTML = `
    <h5 class="tamil tammean">தமிழ் விளக்கம்: <small>${result.tam_exp}</small></h5>
    <h5 class="english">English Meaning: <small>${result.eng_exp}</small></h5>`;
    
    container.append(container1, meancontain);
}

async function previous() {
    try {
        let x = +(document.getElementById("myText").value) - 1;
        if (x > 0) {
            document.getElementById("myText").value = x;
            const kuralid = await fetch("https://api-thirukkural.vercel.app/api?num=" + x);
            const result = await kuralid.json();
            container1.innerHTML = ``;
            details(result);
        }
    } catch (error) {
        console.log("Fetch Error In Previous", error);
    }
}

async function next() {
    try {
        let x = +(document.getElementById("myText").value) + 1;
        if (x < 1331) {
            document.getElementById("myText").value = x;
            const kuralid = await fetch("https://api-thirukkural.vercel.app/api?num=" + x);
            const result = await kuralid.json();
            container1.innerHTML = ``;
            details(result);
        }
    } catch (error) {
        console.log("Fetch Error in Next", error);
    }
}
