const submitBtn=document.getElementById("submitBtn");
const  cityName=document.getElementById("cityName");
const city_name=document.getElementById("city_name");

const day=document.getElementById("day");
const today_date=document.getElementById("today_date");

const temp=document.getElementById("temp_real_val");
const temp_status=document.getElementById("temp_status");

const dataHide=document.querySelector(".middle_layer");

const getCurrentDay=() => {
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    let currentTime=new Date();
    //console.log(weekday[currentTime.getDay()]);
    let day=weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () =>{
    var months=new Array(7);
    months[0]="Jan";
    months[1]="Feb";
    months[2]="Mar";
    months[3]="Apr";
    months[4]="May";
    months[5]="June";
    months[6]="July";
    months[7]="Aug";
    months[8]="Sept";
    months[9]="Oct";
    months[10]="Nov";
    months[11]="Dec";
    var now=new Date();
    var month=months[now.getMonth()];
    var date=now.getDate();

    let hours=now.getHours();
    let mins=now.getMinutes();

    let perios="AM";

    if(hours > 11){
        perios="PM";
        if(hours > 12) hours -= 12;
    }
    if(mins < 10){
        mins="0"+mins;
    }
    //var year=now.getFullYear();
    //console.log(month+"/"+day);
    return `${month}${date} | ${hours}:${mins}${perios} `;
};

day.innerHTML=getCurrentDay();
today_date.innerHTML=getCurrentTime();


const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;

    if(cityVal === ""){
        city_name.innerText="Plz write city name before search";
        dataHide.classList.add("data_hide");
    }
    else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=1fb7af979b7280ed7eecd90194b112a8`;
            const response=await fetch(url);
            // console.log(response);
            const data=await response.json();
            const arrData=[data];
            // console.log(arrData[0].weather[0].main);
            // console.log(arrData[0].main.temp); 
            city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText=arrData[0].main.temp;
            const tempStatus=arrData[0].weather[0].main;
            if(tempStatus == "Clear"){
                temp_status.innerHTML='<i class="fa-solid fa-sun" style="color:#eccc68"></i>';
            }
            else if(tempStatus == "Clouds"){
                temp_status.innerHTML='<i class="fa-solid fa-cloud" style="color:#009ad8;"></i>';
            }
            else if(tempStatus == "Rain"){
                temp_status.innerHTML='<i class="fa-solid fa-cloud-rain"></i>';
            }
            else if(tempStatus == "Mist"){
                temp_status.innerHTML='<i class="fa-solid fa-mistletoe"></i>';
            }
            else if(tempStatus == "Drizzle"){
                temp_status.innerHTML='<i class="fa-solid fa-umbrella"></i>';
            }
            else{
                temp_status.innerHTML='<i class="fa-solid fa-face-grin-wink"></i>';
            }
            dataHide.classList.remove("data_hide");
        }catch{
            city_name.innerText="Plz enter the city name properly";
            dataHide.classList.add("data_hide");
        }
        

    }
}
submitBtn.addEventListener('click',getInfo);