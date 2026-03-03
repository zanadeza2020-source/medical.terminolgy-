if(!sessionStorage.getItem("device_session_id")){
    sessionStorage.setItem("device_session_id","DEV-"+Math.random().toString(36).substring(2,10));
}

const courses = {
    anatomy: { title:"تشريح", icon:"fa-bone", content:{ تلخيصات:[], اختبارات:[], تقارير:[], كتب:[] }},
    physiology: { title:"فسيولوجي", icon:"fa-heart-pulse", content:{ تلخيصات:[], اختبارات:[], تقارير:[], كتب:[] }},
    chemistry: { title:"كيمياء", icon:"fa-flask", content:{ تلخيصات:[], اختبارات:[], تقارير:[], كتب:[] }},
    biology: { title:"أحياء", icon:"fa-dna", content:{ تلخيصات:[], اختبارات:[], تقارير:[], كتب:[] }}
};

function animatePage(html){
    const main=document.getElementById("main");
    main.innerHTML=`<div class="page">${html}</div>`;
    setTimeout(()=>{ document.querySelector(".page").classList.add("show"); },50);
}

function showDashboard(){
    let html="<div class='grid'>";
    Object.keys(courses).forEach(k=>{
        html+=`
        <div class="card" onclick="openCourse('${k}')">
            <i class="fas ${courses[k].icon}"></i>
            <h3>${courses[k].title}</h3>
        </div>`;
    });
    html+="</div>";
    animatePage(html);
}

function openCourse(key){
    let html=`
        <button class="back-button" onclick="showDashboard()">رجوع</button>
        <h2 class="course-title">${courses[key].title}</h2>
        <div class="tabs">
            <div class="tab active">تلخيصات</div>
            <div class="tab">اختبارات</div>
            <div class="tab">تقارير</div>
            <div class="tab">كتب</div>
        </div>
    `;
    animatePage(html);
}

function changeTheme(theme){
    document.body.className="";
    if(theme) document.body.classList.add(theme);
    localStorage.setItem("theme",theme);
}

window.onload=function(){
    showDashboard();
}
