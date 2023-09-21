$(document).ready(function () {
    $('#loading').fadeOut(1000,()=>{
        $('body').css("overflow", "visible"); 
    });
});
async function Getmeal(){
    let response= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let result= await response.json();
    displyMeal(result.meals,20,0)
    MealId()
}
function MealId(){
    let item =document.querySelectorAll(".col-md-3");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            detalis(item[i].id);}) 
        }}

function displyMeal(srcMeal,value,num){
 let cartona=``;
 for(let i=0;i<value && i<20;i++){
    cartona+=
    `<div class="col-md-3" id="${srcMeal[i].idMeal}">
        <div  class="mealImage  position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${srcMeal[i].strMealThumb}" alt="">
            <div class="layer position-absolute d-flex align-items-center text-black ">
            <h3>${srcMeal[i].strMeal}</h3>
            </div>
             </div>
            </div>`}
$('.meals').eq(num).html(`${cartona}`);
}
Getmeal();

function openNav() {
    $("#slidBar").animate({left:0}, 700)
    $('#open').css( "display", "none" );
    $('#close').css( "display", "block");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: '0px'},(i + 5) * 100);
    }
}
function closeNav() {
    let slideinner= $('.slideinner').innerWidth();
    $("#slidBar").animate({left: -slideinner}, 700)
    $('#close').css( "display", "none" );
     $('#open').css( "display", "block");
    $(".links li").animate({top: 300}, 500)
}
closeNav()
$(".side-nav-menu").click(() => {
    if ($("#slidBar").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
$('#hom').click(function(){
  Getmeal();
  $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
  $("#Home").removeClass("nonactive");
    $("#Home").siblings().addClass("nonactive");
    })
})

$('.Search').click(function(){
    openSrarch();
    clearInputs();
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");

 $('#nameValue').keyup(function(info) {
        $("#loading").fadeIn( 50);
        $("#loading").fadeOut(200);
       let nameValue=(info.target.value);
       SearchWithName(nameValue);
       $("#searchMeal").removeClass("nonactive");
       });

$('#firstValue').keyup(function(info) {
        $("#loading").fadeIn( 50);
        $("#loading").fadeOut(200)
       let nameValue=(info.target.value);
       SearchWithFirst(nameValue);
       $("#searchMeal").removeClass("nonactive");
       });
    });
})
function clearInputs(){
    $('input').val('');
    $("#searchMeal").empty();
}

function openSrarch(){
$(function () {
    closeNav();
    $("#Search").removeClass("nonactive");
    $("#Search").siblings().addClass("nonactive");
});
}
async function SearchWithName(Value){
    let nresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Value}`);
    let nresult= await nresponse.json();
    displyMeal(nresult.meals,nresult.meals.length,1);
    MealId();   
}
async function SearchWithFirst(Value){
    let fresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Value}`);
    let fresult= await fresponse.json();
    displyMeal(fresult.meals,fresult.meals.length,1);
    MealId();
}

 $('.Categories').click(function(){      
    openCateg();
    clear(); 
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
     list();  
    });   
})     

function openCateg(){
$(function () {
    closeNav();
    $("#Categories ").removeClass("nonactive");
    $("#Categories").siblings().addClass("nonactive").removeClass("active");
});
}
async function list(){
    let lresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let lresult= await lresponse.json();
    displyList(lresult.categories,lresult.categories.length,0);
    mealName();
}

function mealName(){
    let item =document.querySelectorAll(".layer");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getType(item[i].querySelector("h3").textContent);
        })
    }
}
async function getType(catname){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catname}`);
    let finalResult = await apiResponse.json();
    displyMeal(finalResult.meals,finalResult.meals.length,2);
    $('#catmeals').removeClass("nonactive")
    $('#catmeals').siblings().addClass("nonactive");
    MealId();
}

function displyList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val; i++) {
        cartoona += `
        <div class="col-md-3">
                <div class="meallist position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>`}
       $('.list').eq(num).html(`${cartoona}`);
   }

function MealId(){
    let item =document.querySelectorAll(".col-md-3");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            detalis(item[i].id);
            $("#loading").fadeIn( 50);
            $("#Details ").removeClass("nonactive");
            $("#Details").siblings().addClass("nonactive").removeClass("active");
            $("#loading").fadeOut(1000, function(){
             $('body').css("overflow", "visible");
             closeNav();
            });
        })
    }}

async function detalis(idValue){
    let detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
    let deresult= await detali.json();
    displayDetails(deresult); 
    }

function displayDetails(data) {
    let ingredients = ``
    for (let i = 1;i<=20; i++) {
        if (data.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]}</li>`
        }}

    let tags=data.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit}</li>`
        }}
    else{
            tags=[];}

const cartona = 
                 `<div class="col-md-4">
                    <img class="w-100 rounded-3" src="${data.meals[0].strMealThumb}" alt="image meal">
                    <h2>${data.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                
                <p>${data.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${data.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;
    document.getElementById('meal').innerHTML=cartona;
}

$('.Area').click(function(){      
    openAria();
    clear(); 
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
     arealist(); 
    });
})                              
function openAria(){

$(function () {
    closeNav();
    $("#Area ").removeClass("nonactive");
    $("#Area").siblings().addClass("nonactive").removeClass("active");
});
}
async function arealist(){
    let aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let aresult= await aresponse.json();   
    displyAreaList(aresult.meals,aresult.meals.length,1);
    areaName();
}
function areaName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getArea(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
        })}
}
async function getArea(Areaname){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Areaname}`);
    let arfinalResult = await arResponse.json();
    displyMeal(arfinalResult.meals,arfinalResult.meals.length,3);
    $('#Areameals').removeClass("nonactive")
    $('#Areameals').siblings().addClass("nonactive");
    MealId();
}
function displyAreaList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
            <i class="fa-solid fa-house-laptop fa-4x "></i>
            <h3>${arr[i].strArea}</h3>
          </div>
        </div>`
}
$('.list').eq(num).html(`${cartoona}`);
}

$('.Ingredients').click(function(){      
    openIngre();
    clear(); 
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
    ingrelist();  
    });   
})                              
function openIngre(){
$(function () {
    closeNav();
    $("#Ingredients ").removeClass("nonactive");
    $("#Ingredients").siblings().addClass("nonactive").removeClass("active");
});
}
async function ingrelist(){
    let inresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let inresult= await inresponse.json();   
    displyIngreList(inresult.meals,inresult.meals.length,2);
    ingreName();
}
function ingreName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getIngre(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
        })}
}
async function getIngre(Areaname){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Areaname}`);
    let arfinalResult = await arResponse.json();
    displyMeal(arfinalResult.meals,arfinalResult.meals.length,4);
    $('#Ingmeals').removeClass("nonactive")
    $('#Ingmeals').siblings().addClass("nonactive");
    MealId();

}
function displyIngreList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val && i<20; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${`${arr[i].strDescription}`.split(" ").slice(0,20).join(" ")}</p>
          </div>
        </div>`}

       $('.list').eq(num).html(`${cartoona}`);}

function showContacts() {
    document.getElementById('contact').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
  let  submitBtn = document.getElementById("submitBtn")

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }}
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }}
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }}
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        } }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }}
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
        $('input').val('');} 
    else{
    submitBtn.setAttribute("disabled", true)}
    }
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value}
$('.Contact').click(function(){      
    openCont();
    $('input').val('');
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
     showContacts();  
    });
}) 
function openCont(){
 $(function () {
    closeNav();
    $("#contact ").removeClass("nonactive");
    $("#contact").siblings().addClass("nonactive");
});}
function clear(){
    $('.list').removeClass("nonactive")
    $('.list').siblings().addClass("nonactive");}