<template>
    <div>
      <fgf_navbar></fgf_navbar>
  
      <div class="container mt-5">
        <ul class="breadcrumb">
          <li><router-link to="/home">หน้าแรก</router-link></li>
          <li>แก้ไขข้อมูล</li>
        </ul>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="ฟิกเกอร์:" label-for="input-1" description="">
            <b-form-input id="input-1" v-model="form.name" type="text" placeholder="ชื่อฟิกเกอร์" required>
            </b-form-input>
          </b-form-group>
  
          <b-form-group id="input-group-2" label="รายละเอียด:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.description" placeholder="รายละเอียด" required></b-form-input>
          </b-form-group>
  
          <label class="btn btn-default">
            <input type="file" ref="file" @change="selectFile" />
          </label> 
        <br>  
          <b-button type="submit" class="" variant="primary">Submit</b-button>
          <b-button type="reset" class="m-3" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </div>
  
  </template>
            
  <script>
  import axios from "axios";
  import fgf_navbar from "@/components/fgf_navbar.vue";
  
  export default {
    data() {
      return {
        form: {
          name: '',
          description: '',
         // file: null
        },
        file: null,
        selectedFiles: undefined,
        currentFile: undefined,
        show: true
      }
    },
    methods: {
      selectFile(e) {
        const selectedFile = e.target.files[0]; // accessing file
        this.selectedFiles =selectedFile;
      },
      onSubmit() {
  
        this.currentFile = this.selectedFiles;
  
        console.log(this.currentFile);
  
    
        let formData = new FormData();
        formData.append("file", this.currentFile);
        formData.append("name", this.form.name);  // appending file
        formData.append("description", this.form.description);  // appending file
  
        console.log(formData);
  
        axios.post("http://localhost:4000/figure_api/create", formData)
          .then(res => {
            this.$router.push('/home') 
             console.log(res)
          })
          .catch(err => {
            console.log(err);
          });
  
  
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.description = ''
  
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    components: {
      fgf_navbar
    }
  }
  </script>
  <style>
  /* Style the list */
  ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
  }
  
  /* Display list items side by side */
  ul.breadcrumb li {
    display: inline;
    font-size: 18px;
  }
  
  /* Add a slash symbol (/) before/behind each list item */
  ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
  }
  
  /* Add a color to all links inside the list */
  ul.breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
  }
  
  /* Add a color on mouse-over */
  ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
  }
  </style>
  