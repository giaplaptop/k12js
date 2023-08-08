const peopleArray = [
    { name: 'John Doe', age: 30, address: '123 Main St, City', hobbies: ['Đọc sách', 'Du lịch'] },
    { name: 'Jane Smith', age: 25, address: '456 Park Ave, Town', hobbies: ['Nấu ăn', 'Chơi piano'] },
    { name: 'Bob Johnson', age: 40, address: '789 Broadway, Village', hobbies: ['Đi bộ', 'Xem phim'] }
];

const render = document.querySelectorAll('.render')[0];

function renderHtml(){
    render.innerHTML = `
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Tên</th>
                <th>Tuổi</th>
                <th>Địa chỉ</th>
                <th>Sở thích</th>
            </tr>
        </thead>
        <tbody>
            ${peopleArray.map((obj, index) => {
                return `
                <tr>
                    <td>${obj.name}</td>
                    <td>${obj.age}</td>
                    <td>${obj.address}</td>
                    <td>${obj.hobbies.join(', ')}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editPerson(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deletePerson(${index})">Delete</button>
                    </td>
                </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    `
}

renderHtml();

let indexEdit;
const nameInp = document.getElementById('name');
const ageInp = document.getElementById('age');
const addressInp = document.getElementById('address');
const hobbiesInp = document.getElementById('hobbies');
const addBtn = document.getElementById('btn-add');
const closeBtn = document.getElementById('close-modal');

function save(){
    const data = {
        name: nameInp.value,
        age: ageInp.value,
        address: addressInp.value,
        hobbies: [hobbiesInp.value],
    }
    if (indexEdit!==undefined) {
        peopleArray[indexEdit]= data;
        indexEdit = undefined;
    } else {
        peopleArray.push(data);
    }
    renderHtml();
    cleanData();
    closeBtn.click();
}

function editPerson(index){
    indexEdit = index;
    nameInp.value = peopleArray[index].name;
    ageInp.value = peopleArray[index].age;
    addressInp.value = peopleArray[index].address;
    hobbiesInp.value = peopleArray[index].hobbies.join(', ');
    addBtn.click();
}

function cleanData(){
    nameInp.value = '';
    ageInp.value = '';
    addressInp.value = '';
    hobbiesInp.value = '';
}

function deletePerson(index){
    peopleArray.splice(index,1);
    renderHtml();
}