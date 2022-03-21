<!-- Detailed view page -->
<template>
  <h1 @click="$router.go(-1)" style="cursor: pointer;">&lt;</h1> <!-- back button -->

  <div class="row mt-2">
    <div class="col-12">

        <!-- card -->   
        <div class="card" style="width: 20rem; margin-right: 5px; margin-bottom: 25px;"> 
            <div>
                <img class="mx-auto d-block d-card-img-top" :src="user.avatar" alt="Card image">  <!-- user image -->
            </div>
        
            <div class="card-body pt-3">
                <div class="row">
                    <div class="col-12">  
                        <!-- <div class="card-text text-center d-bold">{{ user.name }}</div> -->
                        <div @click="switchInsert(userName, $event, 1)" v-if="switched !== 1" class="card-text text-center d-bold" id="userName" style="color: #059DCD; cursor: pointer;">{{userName ? userName : '--------'}}</div> 
                        <input v-else-if="(targetId === 'userName' || !switched)" type="text" @blur="handleBlurRestore('userName')" @keyup.enter="handleEnter(userName, 'userName')" id="userName1" v-model="userName" v-focus class="form-control" maxlength="34">

                    </div>
                </div>
                <div class="row" style="margin-top: 9px;"> 
                    <div class="col-12">
                        <div class="card-text text-center d-card-grey">{{ created }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12"> 
                        <div class="col-12 text-center d-card-grey">{{ user.gender }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12"> 
                        <div class="col-12 text-center d-card-grey">{{ user.eyes }} eyes</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12"> 
                        <div class="col-12 text-center d-card-grey">age {{ user.age }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12"> 
                        <div class="col-12 text-center d-card-grey">{{ user.email }}</div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                      <div v-if="tags" class="col-12 text-center d-card-grey">TAGS
                        <div>{{tags}}</div>
                      </div>
                    </div>
                </div>
                 
            </div>
        </div>  <!-- end of class card -->
      </div>
  </div> 

</template>


<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'detailed',
  data() {
    return {
      user: '',  // user data sent via route, here we convert data back to the object
      created: '',  // date created
      tags: '',  // prepare tags array to be displayed as a string (we cannot use v-for to display it properly inside of an element)
      tempValue: '',  // temporary holder for clicked input field, if the user clicks elsewhere it will restore former value
      userName: '',
      //sellerCity: '',
      switched: false,  // did user clicked on the text to change it into the input form? it holds number that represents which element has user switched
      targetId: false  // which element is clicked
    }
  },
  methods: {
    switchInsert(item, e, nr) {  // user clicked text to change it. Warning: properly connect data because function is sending data and not object, so we have to reference it with []
        this.tempValue = item;  // store starting value to tempValue, if pressing Esc newly changed value will be restored to this previous value
        this.targetId = e.target.id; // which element is clicked, store it into targetId
        this.switched = nr; // change text to input field
    },
    handleEnter(item, name) {  // on press Enter system records new value into db and closes input form
        this.tempValue = item;
        this.switched = false;
        this.$store.commit('saveName', { id: this.user.id, name: item }); // we have to know which item was changed, both key and value
    },
    handleBlurRestore(name) {  // on click outside input form restore former values and close input form
        this[name] = this.tempValue; // THIS IS A DIFFERENCE, since we are not receiving object as an function argument but a simple value instead, we must send string name of that variable in quotes '' and access it with this[name]
        this.tempValue = null;  // then temp storage back to null
        this.switched = false;  // switch back to text display
    }
  },
  directives: {  // custom directive for cursor autofocus on the first input field
    focus: {
        mounted: function (el) {  // with Vue3 'mounted' should be used, 'instead' will not work anymore
            el.focus();
        }
    }
  },
  mounted() {
    // due to the new strict ISO standard we have to trim out mistakenly added space at the end of a date string in the db.json
    this.user = JSON.parse(this.$route.params.person) || '';
    this.userName = this.user.name;
    let trimmedDate = this.user.created_at.replace(/\s+$/, ''); 
    this.created = moment(trimmedDate).format("DD.MM.YYYY");
    this.tags = this.user.tags.join(', ');  // build a string from the tags array

  }
}
</script>
