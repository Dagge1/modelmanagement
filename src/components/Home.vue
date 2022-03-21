<template>
  <div class="row">
    <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">
      <div @keyup.enter="search()" class="form-outline">
        <input type="search" id="form1" class="form-control" placeholder="Search by model name + press Enter" v-model="searchTerm" aria-label="Search" />
        <p class="mb-0" style="text-align: right; color: #059DCD; cursor: pointer;"><span @click="sortAsc()">asc&nbsp;</span><span @click="sortDesc()"> desc</span></p>
      </div>
    </div>

  </div>

  <div class="row">
    <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">
    
      <!-- cards listed vertically -->
      <ul class="ps-0" style="list-style-type: none;">
        <li v-for="(item, index) in raw" :key="index">
          <div class="card mt-3">
            <div class="row no-gutters">
              
              <!-- Image part -->
              <div class="col-auto">
                <img @click="goRoute(item)" :src="item.avatar" style="cursor: pointer; height: 200px;" class="img-fluid" alt="image">
              </div>
              
              <!-- Text part -->
              <div class="col">
                <div class="card-block px-2 mt-5 pt-3">
                  <h3 class="card-title">{{ item.name }}</h3>
                </div>
              </div>
            </div>
          </div> <!-- end of the card -->

        </li>
        <infinite-loading  style="text-align: center;" class="mt-3" :identifier="infiniteId" @infinite="infiniteHandler">
            <template #complete>End of results</template> 
            <template #spinner>Loading...</template> 
            <template #error>Error or no data</template>
        </infinite-loading> 
      </ul>

    </div> 
  </div> <!-- end of row -->
 
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      raw: [],  // raw dta received from the json db
      page: 1, // infinite loading, 20 items per page, start with page 1
      changedName: '',  // placeholder for updating changed model name on page Detailed.vue
      searchTerm: '',  // user entered search term
      infiniteId: 0  // identifier that infinite loading uses, on every value change infinite loading will restart from scratch
    }
  },
  methods: {
    infiniteHandler($state) {  // infinite scroll at initial page load, load 20 items at a time
      axios.get('http://localhost:3000/models?_page=' + this.page + '&_limit=20').then((res) => {
        if (res.data.length) { 
          this.raw.push(...res.data);  // join new data with already loaded data in the 'raw' array
          this.page += 1;  // add 'per-page' number
          $state.loaded();  // we got some data
          if (this.$store.state.modelName.length) {  // if user changed one or more model names, update it
            this.editName();
          }
        } else {
          $state.complete(); // all data have been loaded (no data on the server anymore)
        } 
      }).catch((e) => console.log(e));    
    },
    goRoute(data) {  // go to model details page upon click on the image
       this.$router.push({ name: 'detailed', params: {person: JSON.stringify(data)}}); // we have to stringify data first, router passes data only as a string or array of strings
    },
    sortAsc() {  // sort data by name, ascending
      function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

      this.raw.sort( compare );
    },
    sortDesc() {  // sort data by name, descending
      function compare( a, b ) {
        if ( a.name > b.name ){
          return -1;
        }
        if ( a.name < b.name ){
          return 1;
        }
        return 0;
      }

      this.raw.sort( compare );
    },
    search() {  // filter models by model name 
      // in case user entered search term in lowercase we converted first letters to uppercase, because json-server search is case sensitive and model names are capitalized
      let wordsFinal = '';
      if (this.searchTerm) { // first check if there is anything in search term variable
        let words = this.searchTerm.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        wordsFinal = words.join(" ");
      }

      axios.get('http://localhost:3000/models?name=' + wordsFinal).then(res => {
        if (res.data.length) { 
          this.page = 1;
          this.raw = [];
          this.raw.push(...res.data);
          this.searchTerm = '';  // empty search term
        } else if (!wordsFinal) {  // if user entered empty string ignore search and refresh model list
            this.page = 1;
            this.raw = [];
            this.searchTerm = '';  // empty search term
            this.infiniteId += 1; // if there is no search string in the input field or no results and user pressed Enter, re-fetch all products
        } else {
          console.log('Search Else')
          this.page = 1;
          this.raw = [];
          this.searchTerm = '';  // empty search term
          this.infiniteId += 1; // if there is no search string in the input field or no results and user pressed Enter, re-fetch all products
        }
      }).catch(e => console.log(e));
    },
    editName() {  // change all model names conditionally if they were changed at the Detailed.vue page
        for (let i = 0; i < this.raw.length; i++) {
          for (let x = 0; x < this.$store.state.modelName.length; x++) {
            if (this.raw[i].id == this.$store.state.modelName[x]['id']) {
              this.raw[i].name = this.$store.state.modelName[x]['name'];
            }
          }
        }
       
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
