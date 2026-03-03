/* ====== جلسة خاصة لكل جهاز ====== */
if(!sessionStorage.getItem("device_session_id")){
    sessionStorage.setItem("device_session_id","DEV-"+Math.random().toString(36).substring(2,10).toUpperCase());
}
const deviceSession = sessionStorage.getItem("device_session_id");

// عرض معرف الجلسة في الصفحة
document.getElementById('sessionInfo').innerHTML = `<i class="fas fa-id-card"></i> الجلسة: ${deviceSession}`;

/* ====== تأثير إخفاء وإظهار الهيدر عند التمرير ====== */
const header = document.getElementById('main-header');
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY === 0) {
        header.classList.remove('hidden');
        header.classList.add('visible');
    } else if (currentScrollY > lastScrollY) {
        header.classList.add('hidden');
        header.classList.remove('visible');
    } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

/* ====== قائمة المساقات ====== */
const courses = {
    anatomy: {
        title: "تشريح",
        icon: "fa-bone",
        content: {
            تلخيصات: [
                { name: "📘 ملخص الجهاز العظمي", icon: "fa-bone" },
                { name: "📗 ملخص الجهاز العضلي", icon: "fa-muscle" },
                { name: "📙 ملخص الأعصاب", icon: "fa-brain" }
            ],
            اختبارات: [
                { name: "📝 اختبار فصلي", icon: "fa-pen" },
                { name: "📝 اختبار نهائي", icon: "fa-pen-to-square" }
            ],
            تقارير: [
                { name: "📊 تقرير الأداء", icon: "fa-chart-line" }
            ],
            كتب: [
                { name: "📚 كتاب التشريح", icon: "fa-book" },
                { name: "📖 أطلس الجسم", icon: "fa-book-open" }
            ]
        }
    },
    physiology: {
        title: "فسيولوجي",
        icon: "fa-heart-pulse",
        content: {
            تلخيصات: [
                { name: "📘 ملخص جهاز الدوران", icon: "fa-heart" },
                { name: "📗 ملخص الجهاز التنفسي", icon: "fa-lungs" }
            ],
            اختبارات: [
                { name: "📝 اختبار منتصف الفصل", icon: "fa-pen" }
            ],
            تقارير: [],
            كتب: [
                { name: "📚 أساسيات الفسيولوجيا", icon: "fa-book" }
            ]
        }
    },
    chemistry: {
        title: "كيمياء",
        icon: "fa-flask",
        content: {
            تلخيصات: [
                { name: "📘 الكيمياء العضوية", icon: "fa-dna" },
                { name: "📗 الكيمياء الحيوية", icon: "fa-droplet" }
            ],
            اختبارات: [
                { name: "📝 اختبار عملي", icon: "fa-flask" }
            ],
            تقارير: [],
            كتب: []
        }
    },
    biology: {
        title: "أحياء",
        icon: "fa-dna",
        content: {
            تلخيصات: [
                { name: "📘 علم الخلية", icon: "fa-microscope" },
                { name: "📗 الوراثة", icon: "fa-dna" }
            ],
            اختبارات: [],
            تقارير: [],
            كتب: []
        }
    },
    skills: {
        title: "مهارات سريرية",
        icon: "fa-user-doctor",
        content: {
            تلخيصات: [
                { name: "📘 الفحص السريري", icon: "fa-stethoscope" },
                { name: "📗 مهارات التواصل", icon: "fa-comments" }
            ],
            اختبارات: [
                { name: "📝 اختبار OSCE", icon: "fa-user-doctor" }
            ],
            تقارير: [],
            كتب: []
        }
    },
    nursing1: {
        title: "تمريض 1",
        icon: "fa-stethoscope",
        content: {
            تلخيصات: [
                { name: "📘 أساسيات التمريض", icon: "fa-hospital" },
                { name: "📗 العناية الأساسية", icon: "fa-hand-holding-heart" }
            ],
            اختبارات: [],
            تقارير: [],
            كتب: []
        }
    },
    nursing2: {
        title: "تمريض 2",
        icon: "fa-briefcase-medical",
        content: {
            تلخيصات: [
                { name: "📘 تمريض الباطنة", icon: "fa-heart" },
                { name: "📗 تمريض الجراحة", icon: "fa-scalpel" }
            ],
            اختبارات: [],
            تقارير: [],
            كتب: []
        }
    }
};

// تعبئة قائمة المساقات
function populateMenu() {
    const menuItems = document.getElementById('menuItems');
    let html = '';
    Object.keys(courses).forEach(k => {
        html += `
            <div class="menu-item" onclick="openCourse('${k}'); toggleMenu();">
                <i class="fas ${courses[k].icon}"></i>
                <span>${courses[k].title}</span>
            </div>
        `;
    });
    menuItems.innerHTML = html;
}

// فتح/إغلاق القائمة
function toggleMenu() {
    const menu = document.getElementById('courseMenu');
    menu.classList.toggle('show');
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const menu = document.getElementById('courseMenu');
    const button = document.querySelector('.menu-button');
    
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
    }
});

function animatePage(html) {
    const main = document.getElementById("main");
    main.innerHTML = `<div class="page">${html}</div>`;
    setTimeout(() => {
        const page = document.querySelector(".page");
        if (page) page.classList.add("show");
    }, 50);
}

function showDashboard() {
    let html = "<div class='grid'>";
    Object.keys(courses).forEach(k => {
        html += `
            <div class="card" onclick="openCourse('${k}')">
                <i class="fas ${courses[k].icon}"></i>
                <h3>${courses[k].title}</h3>
            </div>`;
    });
    html += "</div>";
    animatePage(html);
}

function openCourse(key) {
    // إغلاق القائمة إذا كانت مفتوحة
    document.getElementById('courseMenu').classList.remove('show');
    
    let html = `
        <button class="back-button" onclick="showDashboard()">
            <i class="fas fa-arrow-right"></i>
            رجوع
        </button>
        <h2 class="course-title">${courses[key].title}</h2>
        <div class="tabs">
            <div class="tab active" onclick="showContent('${key}','تلخيصات',this)">
                <i class="fas fa-book-open"></i> تلخيصات
            </div>
            <div class="tab" onclick="showContent('${key}','اختبارات',this)">
                <i class="fas fa-pen-to-square"></i> اختبارات
            </div>
            <div class="tab" onclick="showContent('${key}','تقارير',this)">
                <i class="fas fa-chart-bar"></i> تقارير
            </div>
            <div class="tab" onclick="showContent('${key}','كتب',this)">
                <i class="fas fa-book"></i> كتب
            </div>
        </div>
        <div id="contentArea"></div>
    `;
    animatePage(html);
    setTimeout(() => {
        showContent(key, "تلخيصات", document.querySelector(".tab"));
    }, 100);
}

function showContent(courseKey, type, el) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    el.classList.add("active");

    const items = courses[courseKey].content[type] || [];
    let html = "<div class='grid'>";

    if (items.length === 0) {
        html = `
            <div class="card" style="text-align: center; grid-column: 1/-1;">
                <i class="fas fa-folder-open" style="font-size: 2.5rem;"></i>
                <h3>لا يوجد محتوى</h3>
                <p style="color: var(--text-light);">سيتم الإضافة قريباً</p>
            </div>
        `;
    } else {
        items.forEach(item => {
            html += `
                <div class="card" onclick="alert('جاري التجهيز: ${item.name}')">
                    <i class="fas ${item.icon || 'fa-file'}"></i>
                    <h4>${item.name}</h4>
                </div>
            `;
        });
    }
    
    html += "</div>";
    document.getElementById("contentArea").innerHTML = `<div class="page show">${html}</div>`;
}

function globalSearch(val) {
    val = val.toLowerCase().trim();
    
    if (val === "") {
        showDashboard();
        return;
    }
    
    let html = "<h2 style='text-align: center; margin-bottom: 1.5rem; font-size: 1.3rem;'>نتائج البحث: " + val + "</h2>";
    html += "<div class='grid'>";
    
    let found = false;
    Object.keys(courses).forEach(k => {
        if (courses[k].title.toLowerCase().includes(val)) {
            found = true;
            html += `
                <div class="card" onclick="openCourse('${k}')">
                    <i class="fas ${courses[k].icon}"></i>
                    <h3>${courses[k].title}</h3>
                </div>`;
        }
    });
    
    if (!found) {
        html += `
            <div class="card" style="grid-column: 1/-1;">
                <i class="fas fa-search" style="font-size: 2.5rem;"></i>
                <h3>لا توجد نتائج</h3>
                <p>جرب كلمات أخرى</p>
            </div>
        `;
    }
    
    html += "</div>";
    animatePage(html);
}

function changeTheme(theme) {
    document.body.className = "";
    if (theme) document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
}

window.onload = function() {
    // تعبئة القائمة
    populateMenu();
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        const select = document.querySelector('.theme-selector select');
        if (select) select.value = savedTheme;
    } else {
        document.body.classList.add('midnight');
        const select = document.querySelector('.theme-selector select');
        if (select) select.value = 'midnight';
    }
    showDashboard();
}
