
let city = document.querySelector("#city")

let submit = document.querySelector("#submit")

let daily = document.querySelector("#daily")

let card = document.querySelector("#card")

let container = document.querySelector("#container")

let weatherData = document.querySelector("#weatherData")

let iframe = document.querySelector("#gmap_canvas")

function got(lat,lon){
    let week = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=e1e0b2da46ede3c96c8d24bc7b916689`
    return week

}
async  function weekdetails(link){
    try{
       let  fetched = await fetch(link)
        let w7 = await fetched.json()
       return w7
    }
    catch(rej){
        console.log("fuckOFF")
    }

}


function activate() {
    event.preventDefault()
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=e1e0b2da46ede3c96c8d24bc7b916689`
    data(url)
}
async function data(url) {
    try {
        let fetched = await fetch(url)
        let w = await fetched.json()
        let co_ord = w.coord
            let lon = co_ord.lon
            let lat = co_ord.lat
            let link = got(lon,lat);
            console.log(link)
            let weekObject = weekdetails(link)
            let finalData = await weekObject
            let daily = finalData.daily
         
               
    
        weatherData.innerHTML = ""
      
        display(w)
      
        display7(daily)

    }
    catch (rej) {
        console.log("rej")
    }
}



function display(w) {
    // console.log(w)
        let maplink = `https://maps.google.com/maps?q=${w.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
        let base = w.base
        let clouds = w.clouds
        let coord = w.coord
       
        let main = w.main
        let rain = w.rain
        let sys = w.sys
        let visibility = w.visibility
        let timezone = w.timezone
        let weather = w.weather
            weather = weather[0].main
        let wind = w.wind

        container.style.display="flex"
       let card =  document.createElement("div")
       card.setAttribute("id","card")


        let first = document.createElement("div")
        first.setAttribute("id","first")
        let h2 = document.createElement("h2")
        h2.style.fontFamily="Domine"
        h2.fontSize = "40px"
        h2.innerText = w.name
        let img = document.createElement("img")
        img.setAttribute("id","weathergif")
        changeimage(weather,img)
        first.append(h2,img)


    


        let temprature = document.createElement("p")
        temprature.style.fontSize="60px"
        temprature.style.fontFamily = "Orbitron"
        temprature.innerHTML = `${( Math.floor(main.temp - 273))}<span id="celsius">&#8451</span> `

        let second = document.createElement("div")
        second.setAttribute("id","second")
        let weath = document.createElement("p")
        weath.setAttribute("id","weath")
        if( weather[0].main===(undefined)){
            weath.innerText = "Sunny"
        }else{
            weath.innerText = weather[0].main 
        }
      
        let mintemp = document.createElement("p")
        mintemp.innerHTML = `${Number(Math.floor(main.temp_min - 273) - Math.floor(Math.random()*5)+1)} ~ `
        let maxtemp = document.createElement("p")
        maxtemp.innerHTML = ` ${Number(Math.floor(main.temp_max - 273) +  Math.floor(Math.random()*5)+1)}<span class="c">&#8451</span>`

        second.append(weath,mintemp,maxtemp)

        let third = document.createElement("div")
        third.setAttribute("id","third")



        let div1 = document.createElement("div")
            timg1 = document.createElement("img")
            timg1.setAttribute("src","/images/temp.png")
            ttemp1 = document.createElement("p")
            ttemp1.innerHTML = `${Math.floor(main.feels_like - 273)}<span class="c">&#8451</span>`
            inf1 = document.createElement("p")
            inf1.innerText= "Feels Like"
            div1.append(timg1,ttemp1,inf1)

        let div2 = document.createElement("div")
            timg2 = document.createElement("img")
            timg2.setAttribute("src","/images/wind.png")
            ttemp2 = document.createElement("p")
            ttemp2.innerText = "Force" + Math.floor(wind.speed)
            inf2 = document.createElement("p")
            inf2.innerText= "WSW"
            div2.append(timg2,ttemp2,inf2)

        let div3 = document.createElement("div")
            timg3 = document.createElement("img")
            timg3.setAttribute("src","/images/humidity.png")
            ttemp3 = document.createElement("p")
            ttemp3.innerText = main.humidity +" %"
            inf3 = document.createElement("p")
            inf3.innerText= "Humidity"
            div3.append(timg3,ttemp3,inf3)

        let div4 = document.createElement("div")
            timg4 = document.createElement("img")
            timg4.setAttribute("src","/images/uv.png")
            ttemp4 = document.createElement("p")
            ttemp4.innerText = "Weak"
            inf4 = document.createElement("p")
            inf4.innerText= "UV"
            div4.append(timg4,ttemp4,inf4)

        let div5 = document.createElement("div")
            timg5 = document.createElement("img")
            timg5.setAttribute("src","/images/visi.png")
            ttemp5 = document.createElement("p")
            ttemp5.innerText = Math.floor(visibility/1000) + " KM"
            inf5 = document.createElement("p")
            inf5.innerText= "Visibility"
            div5.append(timg5,ttemp5,inf5)

        let div6 = document.createElement("div")
            timg6 = document.createElement("img")
            timg6.setAttribute("src","/images/press.png")
            ttemp6 = document.createElement("p")
            ttemp6.innerText = main.pressure +  " hPa"
            inf6 = document.createElement("p")
            inf6.innerText= "Air Pressure"
            div6.append(timg6,ttemp6,inf6)

        third.append(div1,div2,div3,div4,div5,div6)

        iframe.src = maplink

       card.append(first,temprature,second,third)
       weatherData.append(card)

}

function display7(w7){
    // console.log(w7)
    daily.innerHTML = ""
    let arr= ["Sat","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    w7.forEach(function(elem,index){
       let imgdetail = elem.weather[0].main
       let temp  = Number(elem.temp.day - 253.15).toFixed(1)
       let min = Number(elem.temp.min - 253.15).toFixed(1)
       let max = Number( elem.temp.max - 253.15).toFixed(1)
     

        
        let div1 = document.createElement("div")
        div1.setAttribute("id","div1")
            let name = document.createElement("h5")
            for(let i = 0 ; i<arr.length;i++){
                name.innerText = arr[index]
            }
           
            let img = document.createElement("img")
            img.setAttribute("id","dailygif")
            changeimage(imgdetail,img)
           let temprature = document.createElement("p")
           temprature.innerHTML= `  ${temp} <span class="c">&#8451</span>`

           let diff = document.createElement("div")
           diff.setAttribute("id","diff")
            let mini = document.createElement("p")
            mini.innerHTML =`  ${min} <span class="c">&#8451</span>	&nbsp`
            let maxi = document.createElement("p")
            maxi.innerHTML = ` ~ &nbsp${max} <span class="c">&#8451</span>`
            diff.append(mini,maxi)
            div1.append(name,img,temprature,diff)

              daily.append(div1)
    
    })
}

function changeimage(x,img){
    // let x = a.weather[0].main
    if(x === "Clouds"){
        img.setAttribute("src","/images/cloudy.svg")


    }else if(x === "Haze"){
        img.setAttribute("src","/images/fog.png")
    }
    else if(x === "Clear"){
        img.setAttribute("src","/images/day.svg")
    }
    else if(x === "Sunny"){
        img.setAttribute("src","/images/day.gif")
    }
    else if(x === "Snow"){
        img.setAttribute("src","/images/snow.gif")
    }
    
    else{
        img.setAttribute("src","/images/elsew.svg")
    }

}

function addData(){
    let arr= ["Sat","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    for(let i=0;i<arr.length;i++){

    }
}

function getlocation (){
    console.log("1")
    navigator.geolocation.getCurrentPosition(success)
}

function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    console.log("2")
    mylocation (crd.latitude,crd.longitude)
  

}

function mylocation(lat,lon){
    let locationurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e1e0b2da46ede3c96c8d24bc7b916689`
      
    console.log("3")
    data(locationurl)
    }
  


// {/* <div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.whatismyip-address.com/divi-discount/">divi discount</a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">how to add google maps to wordpress</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div> */}