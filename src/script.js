import Vue from "vue"

let bus = new Vue()

Vue.component("to-do", {
    template: `
        <div class = "app-tab" id="to-do"  @submit.prevent = "onSubmit">
            <h2 class="app-tab__title"> To do: </h2>
            <form class="app-tab-add" > 
                <input type="text" class = "app-tab-add__add_entry"
                v-model="task" placeholder="Type in the new task" required>
                <input type="submit" value="Submit">
            </form>
            <div v-if="toDoList.length == 0">
                <h5> No tasks to do.. </h5>
                <p> You may want to add something! </p>
            </div>
            <div v-else>
                <h4 class = "app-tab__entry" v-for="(item,index) in toDoList" v-on:click="completeTask(index)">
                &#10003; {{item}} </h4> 
            </div>
            
        </div>
    `,
    data(){
        return{
            toDoList: [
                
            ],
            task:'',
        }
    },
    methods:{
        completeTask: function(id){
            bus.$emit("add-to-completed", this.toDoList[id])   
            this.toDoList.splice(id,1)
        },
        onSubmit: function(){
            this.toDoList.push(this.task)
            this.task = "";

        }
    }
})

Vue.component("completed", {
    template: `
        <div class="app-tab" id="completed">
            <h2 class="app-tab__title"> Completed: </h2>
            <div class="app-tab-clear">
                <button class="app-tab-clear__button" v-on:click="clearCompleted"> Clear completed </button>
            </div>
            <div v-if="completedList.length == 0">
                <h5> Nothing is completed yet.. </h5>
                <p> Seems like you have a lot to accomplish! </p>
            </div>
            <div v-else>
                <h4 class = "app-tab__entry" v-for="(item,index) in completedList"> {{index+1}}: {{item}} </h4>
            </div>
        </div>
    `,
    data(){
        return{
            completedList: [

            ],
        }
    },
    mounted() {
        bus.$on("add-to-completed", (value) => {           
            this.completedList.push(value)
        })
    },
    methods:{
        clearCompleted: function(){
            this.completedList = []
        }
    }
})

let app = new Vue({
    el: "#app",
    data: {
        message: 'meh',
    },
})