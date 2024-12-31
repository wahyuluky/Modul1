<script setup>
    //import ref
    import { ref } from "vue";
 
    //import router
    import { useRouter } from 'vue-router';
 
    //import api
    import api from "../../api";
 
    //init router
    const router = useRouter();
 
    //define state
    const user_id = ref("");
    const name = ref("");
    const email = ref("");
    const number = ref("");
    const method = ref("");
    const address = ref("");
    const total_products = ref("");
    const total_price = ref("");
    const placed_on = ref("");
    const payment_status = ref("");
    const errors = ref([]);
 
 
    //method "storePost"
    const storeOrder = async () => {
 
        //init formData
        let formData = new FormData();
 
        //assign state value to formData
        formData.append("user_id", user_id.value);
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("number", number.value);
        formData.append("method", method.value);
        formData.append("address", address.value);
        formData.append("total_products", total_products.value);
        formData.append("total_price", total_price.value);
        formData.append("placed_on", placed_on.value);
        formData.append("payment_status", payment_status.value);

 
        //store data with API
        await api.post('/api/orders', formData)
        .then(() => {
            //redirect
            router.push({ path: "/orders" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors.value = error.response.data;
        });
    };
</script>
 
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeOrder()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">User Id</label>
                                <textarea class="form-control" v-model="user_id" placeholder="User Id"></textarea>
                                <div v-if="errors.user_id" class="alert alert-danger mt-2">
                                    <span>{{ errors.user_id[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <textarea class="form-control" v-model="name" placeholder="name"></textarea>
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    <span>{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <textarea class="form-control" v-model="email" placeholder="email"></textarea>
                                <div v-if="errors.email" class="alert alert-danger mt-2">
                                    <span>{{ errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Number</label>
                                <textarea class="form-control" v-model="number" placeholder="number"></textarea>
                                <div v-if="errors.number" class="alert alert-danger mt-2">
                                    <span>{{ errors.number[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Method</label>
                                <textarea class="form-control" v-model="method" placeholder="method"></textarea>
                                <div v-if="errors.method" class="alert alert-danger mt-2">
                                    <span>{{ errors.method[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Address</label>
                                <textarea class="form-control" v-model="address" placeholder="address"></textarea>
                                <div v-if="errors.address" class="alert alert-danger mt-2">
                                    <span>{{ errors.address[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Total Product</label>
                                <textarea class="form-control" v-model="total_products" placeholder="total product"></textarea>
                                <div v-if="errors.total_products" class="alert alert-danger mt-2">
                                    <span>{{ errors.total_products[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Total Price</label>
                                <textarea class="form-control" v-model="total_price" placeholder="total price"></textarea>
                                <div v-if="errors.total_price" class="alert alert-danger mt-2">
                                    <span>{{ errors.total_price[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Placed On</label>
                                <textarea class="form-control" v-model="placed_on" placeholder="placed on"></textarea>
                                <div v-if="errors.placed_on" class="alert alert-danger mt-2">
                                    <span>{{ errors.placed_on[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Payment Status</label>
                                <textarea class="form-control" v-model="payment_status" placeholder="payment status"></textarea>
                                <div v-if="errors.payment_status" class="alert alert-danger mt-2">
                                    <span>{{ errors.payment_status[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>