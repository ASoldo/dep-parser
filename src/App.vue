<template>
  <div id="app">
    <div class="wrapper">
      <input class="input custom-file-upload" @change="onFileChange" type="file" accept=".json">
        <vue-json-to-csv :json-data="outputArray">
            <button class="button" :disabled="outputArray.length <= 0">Download CSV</button>
        </vue-json-to-csv>
      </div>
  </div>
</template>

<script>
// import OutputJson from '@/assets/output.json'
// import OutputJson from '@/assets/output2.json'

export default {
  name: 'App',
  components: {   
  },
  data() {
    return {
      output: null,
      outputArray: [],
      fileinput: ''
    }
  },
  created() {
    // this.iterate(this.output);  
    // console.table(this.outputArray);
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length){
        return;
      }
      this.createInput(files[0]);
    },
    createInput(file) {
      this.output = file;
      this.outputArray = [];
      var reader = new FileReader();
      var self = this;
      reader.onload = () => {
        self.iterate(JSON.parse(reader.result));
        // console.table(self.outputArray);
      }
      reader.readAsText(file);
      // console.log(this.fileinput);
    },
    iterate(obj) {
      var self = this;
      Object.keys(obj).forEach(key => {
        if(obj[key].version !== undefined || obj[key.resolved] !== undefined){
          self.outputArray.push({key: key, version: obj[key].version, resolved: obj[key].resolved ? obj[key].resolved : ""});
        }
        if (typeof obj[key] === "object") {
            self.iterate(obj[key])
        }
      });
    }
  }
}
</script>

<style>
html, body{
  padding: 0px;
  margin: 0px;
}

#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgb(6, 37, 78) 0%, rgb(7, 99, 141) 100%);
}

.button{
  background-color: #3498db;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
}

.button:hover{
  background-color: #2963b9 !important;
}

.input{
  border-radius: 4px;
  height: auto;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #3498db;
  background-image: none;
  margin-left: 10px;
}

.wrapper{
  background-color: black;
  border-radius: 50px;
}

input[type="file"] {
    /* display: none; */
}

.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    width: 300px;
}

::-webkit-file-upload-button {
 background-color: #3498db;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50px;
}
</style>
