import { html, render } from './node_modules/lit-html/lit-html.js';

async function solve() {
   let tbody = document.querySelector('tbody');
   let input = document.querySelector('#searchField')
   let output = await getData();
   let data = Object.values(output);

   let createTableRow = (info) => html`
   <tr class='${info.class}'>
      <td>${info.firstName} ${info.lastName}</td>
      <td>${info.email}</td>
      <td>${info.course}</td>
   </tr>
   `


   render(data.map(info => createTableRow(info)), tbody);
   onClick = onClick.bind(null, data, input, createTableRow, tbody);
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let value = input.value;
      update(data, value);
      render(data.map(info => createTableRow(info)), tbody);
      input.value="";
      resetData(data);
      

   }

   function update(data,value) {
   
      data = data.map(student => {
         if (student.firstName.toLowerCase().includes(value.toLowerCase()) ||
            student.lastName.toLowerCase().includes(input.value.toLowerCase()) ||
            student.email.toLowerCase().includes(input.value.toLowerCase()) ||
            student.course.toLowerCase().includes(input.value.toLowerCase())) {
            student.class = "select";

         } else {
            student.class = "";
         }
         return student;
      })

   }

   function resetData(data){
      data = data.map(student => {
         student.class="";
         return student;
      })}




   async function getData() {

      try {
         let response = await fetch(`http://localhost:3030/jsonstore/advanced/table`);

         if (response.ok == false) {
            throw new Error("The data serched are not accessable");
         }

         let data = await response.json();
         return data;
      } catch (error) {
         alert(error.message);
         throw error
      }

   }
}

solve();