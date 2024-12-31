<script setup>
 
    //import ref and onMounted
    import { ref, onMounted } from 'vue';
 
    //import api
    import api from '../../api';
 
    //define state
    const messages = ref([]);
 
    //method fetchDataPosts
    const fetchDatamessages = async () => {
 
        //fetch data 
        await api.get('/api/messages')
 
        .then(response => {
 
            //set response data to state "posts"
            messages.value = response.data.data.data
 
        });
    }
 
    //run hook "onMounted"
    onMounted(() => {
 
        //call method "fetchDataPosts"
        fetchDatamessages();
    });
 
    //method deletePost
    const deletemessages = async (id) => {
 
        //delete post with API
        await api.delete(`/api/messages/${id}`)
        .then(() => {
 
            //call method "fetchDataPosts"
            fetchDatamessages();
        })
 
    };
 
</script>
 
<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'messages.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW MESSAGE</router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Message</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="messages.length == 0">
                                    <td colspan="4" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(post, index) in messages" :key="index">
                                    <td>{{ post.user_id }}</td>
                                    <td>{{ post.name }}</td>
                                    <td>{{ post.email }}</td>
                                    <td>{{ post.number }}</td>
                                    <td>{{ post.message }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'messages.edit', params:{id: post.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button @click.prevent="deletemessages(post.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>