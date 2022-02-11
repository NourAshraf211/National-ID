let cities = [
    {"Cairo": 01},
    {'Alex': 02},
    {"Port Said": 03},
    {"Suez":04},
    {"Damietta":11},
    {"Dakahlia":12},
    {"Sharqia":13},
    {"Qalyubia":14},
    {"Kafr El-Sheikh":15},
    {"Gharbia":16},
    {"eheira":17},
    {"Beheira":18},
    {"Ismailia":19},
    {"Giza":21},
    {"Bani Sweif":22},
    {"Fayoum":23},
    {"Minya":24},
    {"Asyut":25},
    {"Sohag":26},
    {"Qana":27},
    {"Aswan":28},
    {"Luxor":29},
    {"Red Sea":31},
    {"El-Wadi El-Gedid":32},
    {"Matrouh":33},
    {"North Sinaa":34},
    {"South of Sinaa":35},
    {"Out of Egypt":88},
];

let container = document.querySelector('.info-container');
let input = document.querySelector('input');
let btn = document.querySelector('.btn');
let p = document.createElement('p');

let obj = {};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

btn.addEventListener('click' , checkAllValidations);

//The main function
function checkAllValidations(){
    removeAllChildNodes(container);
    var value = input.value;
    if(Number(value)){
        if(value.length == 14){
            if((value[0] == 2 || value[0] == 3) && dateValidation(value) && cityValidation(value)){
                if(Number(value.slice(9,13)) % 2 == 0){
                    obj.Gender = 'Female';
                }else{
                    obj.Gender = 'Male';
                }
                showInfo(obj);
            }else{
                p.innerHTML = "Please enter a valid National ID";
                container.append(p);
            }
        }else{
            p.innerHTML = "Please enter 14 digits";
            container.append(p);
        }
    }else{
        p.innerHTML = "Please enter valid data!";
        container.append(p);
    }
}


//////To check the date of birth
function dateValidation(value){
    let year = value[0] == 2 ? '19' + value.slice(1,3) : '20' + value.slice(1,3);
    let month = value.slice(3,5);
    let day = value.slice(5,7);
    
    let date = new Date();
    
    var dateValid = moment(month + day + year, "MMDDYYYY", true);
    if(dateValid.isValid()){
        if(Number(year) < date.getFullYear()){
            obj.Birthday_Date = day + '/' + month + '/' + year;
            return true;
        }else if(Number(year) == date.getFullYear()){
            if(Number(month) < date.getMonth() + 1){
                obj.Birthday_Date = day + '/' + month + '/' + year;
                return true;
            }else if(Number(month) == date.getMonth() + 1){
                if(Number(day) <= date.getDate()){
                    obj.Birthday_Date = day + '/' + month + '/' + year;
                    return true;
                }else{return false;}
            }else{return false;}
        }else{return false;}
    }else{return false;}
}

/////// To check the code of government
function cityValidation(value){
    for(city of cities){
        if(Object.values(city)[0] == Number(value.slice(7,9))){
            console.log(Object.values(city)[0]);
            console.log(typeof(Object.values(city)[0]));
        console.log(Number(value.slice(7,9)));
        console.log(typeof(Number(value.slice(7,9))));
            obj.Government = Object.keys(city)[0];
            return true;
        }
    }
    return false;
}

//// Show information
function showInfo(object){
    p.innerHTML = 'The National ID is valid!'
    container.append(p);
    for (const info in object){
        let title = document.createElement('div');
        let value = document.createElement('span'); 
        title.innerHTML = info +":";
        value.innerHTML = object[info];
        title.append(value);
        container.append(title);
    }
}