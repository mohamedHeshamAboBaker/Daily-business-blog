var light = document.getElementById("light");
var add = document.getElementById("add");
var x = localStorage.getItem("mode") === "dark" ? true : false; // استرجاع الوضع المحفوظ إذا كان موجودًا

// تحديث العرض بناءً على الوضع الجديد
function change() {
    var pearntElements = document.getElementsByClassName("pearnt");

    if (x === false) {
        light.innerHTML = `<i class="fas fa-sun"></i>`;
        document.getElementsByTagName("body")[0].style.backgroundColor = "#000008";
        document.getElementsByTagName("nav")[0].style.backgroundColor = "#00000D";
        
        if (pearntElements.length > 0) {
            for (var i = 0; i < pearntElements.length; i++) {
                pearntElements[i].style.backgroundColor = "#00000e";
                pearntElements[i].style.color = "silver";
            }
        }
        document.getElementsByClassName("myh1")[0].style.color = "silver";
    } else {
        light.innerHTML = `<i class="fas fa-moon"></i>`;
        document.getElementsByTagName("body")[0].style.backgroundColor = "white";
        document.getElementsByTagName("nav")[0].style.backgroundColor = "rgb(64, 87, 118)";
        if (pearntElements.length > 0) {
            for (var i = 0; i < pearntElements.length; i++) {
                pearntElements[i].style.backgroundColor = "rgb(64, 87, 118)";
                pearntElements[i].style.color = "#00BCD4";
            }
        }
        document.getElementsByClassName("myh1")[0].style.color = "#3f51b5";
    }
}

// استدعاء الدالة change() لتحديث الوضع عند تحميل الصفحة
change();

// إضافة معالج للضغط على الزر لتبديل الوضع
light.addEventListener("click", function() {
    x = !x; // تبديل الوضع بين الفاتح والمظلم
    change(); // تحديث العرض بناءً على الوضع الجديد
    // حفظ الوضع في localStorage
    localStorage.setItem("mode", x ? "dark" : "light");
});

function add_disc() {
    $(".sec2").fadeIn();
}

function creatDiv(){
    $(".sec2").fadeOut();

    // قراءة قيم حقول الإدخال
    var work = document.getElementById('work').value;
    var description = document.getElementById('disc').value;
    
    // إنشاء عنصر div جديد
    var div = document.createElement('div');
    
    // إضافة الأسلوب ".pearnt" للعنصر الذي يتم إنشاؤه
    div.classList.add("pearnt");
    
    // إنشاء عنصر h2 لعنوان العمل وتعيين القيمة
    var h2 = document.createElement('h2');
    h2.textContent = work;
    
    // إضافة الأسلوب ".myh2" للعنصر h2
    h2.classList.add("myh2");
    
    // إنشاء عنصر checkbox وتعيين القيمة
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    // إضافة الأسلوب ".Mycheakbox" للعنصر checkbox
    checkbox.classList.add("Mycheakbox");
    
    // إنشاء عنصر label للوصف وتعيين القيمة
    var label = document.createElement('label');
    label.textContent = description;
    
    // إضافة العناصر إلى الـ div
    div.appendChild(h2);
    div.appendChild(checkbox);
    div.appendChild(label);

    // إضافة معالج لحفظ حالة الـ checkbox في localStorage عند التغيير
    checkbox.addEventListener("change", function() {
        saveCheckboxStateToLocalStorage(checkbox);
    });

    // إضافة زر لحذف العنصر
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt" style="color: red;"></i>'; // تغيير زر الحذف إلى أيقونة سلة المهملات وتلوينها بلون أحمر
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", deleteDiv);
    div.appendChild(deleteButton);

    // إضافة الـ div إلى الصفحة داخل عنصر ذو الهوية "sec1"
    document.getElementById('sec1').appendChild(div);

    // حفظ الديف المنشأ في localStorage
    saveDivToLocalStorage(div.outerHTML);
}

// دالة لحذف العنصر
function deleteDiv() {
    var parentDiv = this.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);

    // حذف الديف المحذوف من localStorage
    removeDivFromLocalStorage(parentDiv.outerHTML);
}

// دالة لحفظ حالة الـ checkbox في localStorage عند التغيير
function saveCheckboxStateToLocalStorage(checkbox) {
    var checkboxID = checkbox.id;
    var checkboxState = checkbox.checked;
    localStorage.setItem(checkboxID, checkboxState);
}

// حفظ الديف المنشأ في localStorage
function saveDivToLocalStorage(divHTML) {
    var savedDivs = JSON.parse(localStorage.getItem("savedDivs")) || [];
    savedDivs.push(divHTML);
    localStorage.setItem("savedDivs", JSON.stringify(savedDivs));
}

// إعادة إنشاء العناصر المحفوظة من localStorage
window.onload = function() {
    var savedDivs = JSON.parse(localStorage.getItem("savedDivs")) || [];
    savedDivs.forEach(function(divHTML) {
        var div = document.createElement("div");
        div.innerHTML = divHTML;
        document.getElementById("sec1").appendChild(div);

        // إعادة تعيين حالة الـ checkbox من localStorage
        var checkbox = div.querySelector(".Mycheakbox");
        var checkboxID = checkbox.id;
        var checkboxState = localStorage.getItem(checkboxID);
        if (checkboxState === "true") {
            checkbox.checked = true;
        }

        // إضافة معالج لحفظ حالة الـ checkbox في localStorage عند التغيير
        checkbox.addEventListener("change", function() {
            saveCheckboxStateToLocalStorage(checkbox);
        });

        // إضافة معالج لحذف العنصر
        div.querySelector(".delete-button").addEventListener("click", deleteDiv);
    });
}

// حذف الديف المحذوف من localStorage
function removeDivFromLocalStorage(divHTML) {
    var savedDivs = JSON.parse(localStorage.getItem("savedDivs")) || [];
    var index = savedDivs.indexOf(divHTML);
    if (index !== -1) {
        savedDivs.splice(index, 1);
        localStorage.setItem("savedDivs", JSON.stringify(savedDivs));
    }
}
