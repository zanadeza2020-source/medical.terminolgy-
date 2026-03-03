const courses={
 med_terms:{title:"مصطلحات طبية",icon:"fa-notes-medical"},
 gen_chem:{title:"كيمياء عامة",icon:"fa-flask"},
 gen_bio:{title:"احياء عامة",icon:"fa-dna"},
 arabic1:{title:"اللغة العربية 1",icon:"fa-language"},
 intro_nursing:{title:"مقدمة لعلوم التمريض",icon:"fa-user-nurse"},
 palestine:{title:"القضية الفلسطينيه",icon:"fa-flag"},
 aqeeda:{title:"العقيده الاسلاميه",icon:"fa-mosque"},

 nursing_practical:{title:"أساسيات التمريض عملي 1",icon:"fa-hospital-user"},
 nursing1:{title:"أساسيات التمريض 1",icon:"fa-stethoscope"},
 safety:{title:"مبادئ السلامة والأمان",icon:"fa-shield-halved"},
 microbio:{title:"علم الاحياء الدقيقة العام",icon:"fa-bacteria"},
 biochem:{title:"كيمياء حيوية طبية",icon:"fa-vial"},
 quran:{title:"القران الكريم",icon:"fa-book-quran"},
 anatomy:{title:"علم التشريح ووظائف الاعضاء1",icon:"fa-bone"}
};

function animatePage(html){
 const main=document.getElementById("main");
 main.innerHTML=html;
}

/* الرئيسية */
function showDashboard(){
 animatePage(`
  <div class="card">
   <i class="fas fa-user-nurse"></i>
   <h2>تخصص التمريض - سنة أولى</h2>
  </div>

  <div class="grid">
   <div class="card" onclick="openSemester(1)">
    <i class="fas fa-calendar-alt"></i>
    <h3>الفصل الأول</h3>
   </div>

   <div class="card" onclick="openSemester(2)">
    <i class="fas fa-calendar-check"></i>
    <h3>الفصل الثاني</h3>
   </div>
  </div>
 `);
}

/* الفصول */
function openSemester(sem){

 const list=sem===1?
 ["med_terms","gen_chem","gen_bio","arabic1","intro_nursing","palestine","aqeeda"]:
 ["nursing_practical","nursing1","safety","microbio","biochem","quran","anatomy"];

 let html=`<button class="back-button" onclick="showDashboard()">رجوع</button>
 <h2 class="course-title">مساقات ${sem===1?"الفصل الأول":"الفصل الثاني"} (${list.length})</h2>
 <div class="grid">`;

 list.forEach(k=>{
  html+=`
  <div class="card" onclick="openCourse('${k}')">
   <i class="fas ${courses[k].icon}"></i>
   <h3>${courses[k].title}</h3>
  </div>`;
 });

 html+="</div>";
 animatePage(html);
}

/* فتح مساق */
function openCourse(key){
 animatePage(`
  <button class="back-button" onclick="showDashboard()">رجوع</button>
  <h2 class="course-title">${courses[key].title}</h2>

  <div class="tabs">
   <div class="tab active" onclick="switchTab(this,'summaries')">تلخيصات</div>
   <div class="tab" onclick="switchTab(this,'exams')">اختبارات</div>
   <div class="tab" onclick="switchTab(this,'reports')">تقارير</div>
   <div class="tab" onclick="switchTab(this,'books')">كتب</div>
  </div>

  <div id="tabContent"></div>
 `);

 loadTabContent("summaries");
}

function switchTab(el,type){
 document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
 el.classList.add("active");
 loadTabContent(type);
}

function loadTabContent(type){
 let content={
  summaries:["ملخص الوحدة الأولى","ملخص الوحدة الثانية"],
  exams:["اختبار قصير 1","اختبار منتصف الفصل"],
  reports:["تقرير عملي 1","تقرير عملي 2"],
  books:["كتاب المنهج الرسمي","مرجع إضافي"]
 };

 let html="<div class='grid'>";
 content[type].forEach(item=>{
  html+=`<div class="card">${item}</div>`;
 });
 html+="</div>";

 document.getElementById("tabContent").innerHTML=html;
}

function globalSearch(val){
 val=val.toLowerCase();
 if(!val){showDashboard();return;}

 let results=Object.keys(courses).filter(k=>
  courses[k].title.toLowerCase().includes(val)
 );

 let html=`<h2 class="course-title">نتائج البحث (${results.length})</h2><div class="grid">`;

 if(results.length===0){
  html+=`<div class="card">لا توجد نتائج</div>`;
 }else{
  results.forEach(k=>{
   html+=`<div class="card" onclick="openCourse('${k}')">
    <i class="fas ${courses[k].icon}"></i>
    <h3>${courses[k].title}</h3>
   </div>`;
  });
 }

 html+="</div>";
 animatePage(html);
}

showDashboard();
