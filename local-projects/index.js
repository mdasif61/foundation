const sendBtn=document.getElementById("sendBtn").addEventListener("click",info);

function validate(){
    const allValue=(id)=>document.getElementById(id).value;
    const name=allValue("name");
    const address=allValue("address");
    const mounthlyFee=allValue("mounthlyFee");
    const fundFee=allValue("fundFee");
    const fine=allValue("fine");
    const date=allValue("date");

    if(name==""){
        alert("Name is required! please try again!!");
        return;
    }else if(address==""){
        alert("Address is required! please try again!!");
        return;
    }else if(mounthlyFee==""){
        alert("Mounthly Fee is required! please try again!!");
        if(isNaN(mounthlyFee)){
            alert("Mounthly fee not a number! Provide a number");
            return;
        }
        return;
    }else if(fundFee==""){
        alert("Fund Fee is required! please try again");
        if(isNaN(fundFee)){
            alert("Fund fee not a number! Provide a number");
            return;
        }
        return;
    }else if(fine==""){
        alert("Fine is required! please try again");
        return;
    }else if(date==""){
        alert("Date is required! please try again");
        return;
    }
    return true;
}
function info(){
    if(validate()==true){
    const allValue=(id)=>document.getElementById(id).value;
    const name=allValue("name");
    const address=allValue("address");
    const mounthlyFee=allValue("mounthlyFee");
    const fundFee=allValue("fundFee");
    const fine=allValue("fine");
    const date=allValue("date");
    let id=Math.floor(Math.random()*10000)+"";
        const success=document.getElementById("success");
        success.classList.remove("hidden")
    let data=[];
    const allData={name,address,mounthlyFee,fundFee,fine,date,id};
    const local=localStorage.getItem("info");
    if(local==null){
        data=[]
    }else{
        data=JSON.parse(localStorage.getItem("info"));
    }
    data.push(allData);
    localStorage.setItem("info",JSON.stringify(data));
    displayShow()
    }
    document.getElementById("name").value=""
    document.getElementById("address").value=""
    document.getElementById("mounthlyFee").value=""
    document.getElementById("fundFee").value=""
    document.getElementById("fine").value=""
    document.getElementById("date").value=""
}

const ok=()=>{
    const success=document.getElementById("success");
    success.classList.add("hidden")
}

function displayShow(){
    const local=JSON.parse(localStorage.getItem("info"));
    const history=document.getElementById("history");
    const tables=document.querySelector("#tables tbody")
    let html="";

    for(let i=0;i<local.length;i++){
        const {name,address,mounthlyFee,fundFee,fine,date,id}=local[i];
        html+=`
        <tr>
            <td>${i+1}</td>
            <td class="cursor-pointer"><label onclick="seeInfo(${id})" class="cursor-pointer" for="my-modal-3">${name}</label></td>
            <td>${mounthlyFee}</td>
            <td>${fundFee}</td>
            <td>${fine}</td>
            <td>${date}</td>
            <td>
                <i onclick="editBtn(${i})" class="fa-regular fa-pen-to-square text-lg mx-1 text-warning"></i>
                <i onclick="deleteBtn(${i})" class="fa-solid fa-delete-left text-lg mx-1 text-red-600"></i>
            </td>
        </tr>
        `
    }
    tables.innerHTML=html;
}

const deleteBtn=(index)=>{
    const local=JSON.parse(localStorage.getItem("info"));
    local.splice(index,1);
    localStorage.setItem("info",JSON.stringify(local));
    displayShow()
}

const editBtn=(index)=>{
    const local=JSON.parse(localStorage.getItem("info"));
    const allValue=(id)=>document.getElementById(id).value=local[index].name;
    const name=allValue("name");
    const address=allValue("address");
    const mounthlyFee=allValue("mounthlyFee");
    const fundFee=allValue("fundFee");
    const fine=allValue("fine");
    const date=allValue("date");
    
}

const photo=[
    "./images/01.jpg",
    "./images/02.jpg",
    "./images/03.jpg",  
]

const seeInfo=(id)=>{
    const local=JSON.parse(localStorage.getItem("info"));
    const modalInfo=local.find(a=>a.id==id);
    const modalName=document.getElementById("modalName").innerText=modalInfo.name;
    const modalImg=document.getElementById("modalImg");
    if(modalInfo.name.startsWith("Hossain")){
        modalImg.setAttribute("src",photo[0]);
    }else if(modalInfo.name.startsWith("Ikbal")){
        modalImg.setAttribute("src",photo[1])
    }else{
        modalImg.removeAttribute("src")
    }
    const modalAddress=document.getElementById("modalAddress").innerText=modalInfo.address;
    const modalTable=document.querySelector("#modalTable tbody");
    modalTable.innerHTML=`
    <tr>
        <td>${modalInfo.name}</td>
        <td>${modalInfo.address}</td>
        <td>${modalInfo.date}</td>
    </tr>
    `
}

const clearAll=()=>{
    const sure=confirm("are you sure?");
    if(sure){
        localStorage.clear();
        location.reload();
    }else{
        return;
    }
    displayShow()
}

const showBtn=()=>{
    const historyCon=document.getElementById("history-con").style.display="flex";
    const infoCon=document.getElementById("info-con").style.display="none";
}
const back=()=>{
    const historyCon=document.getElementById("history-con").style.display="none";
    const infoCon=document.getElementById("info-con").style.display="flex";
}
displayShow()