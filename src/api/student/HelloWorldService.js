import axios from 'axios'

class HelloWorldService {

    executeHelloWorldService() {
        return axios.get('http://localhost:8083/spring-boot-app/test/getMessage');
        console.log('execution BE done')
    }

    executeHelloWorldServiceWithPathParam(msg) {
        console.log('executeHelloWorldServiceWithPathParam')
        console.log(msg)
        return axios.get('http://localhost:8083/spring-boot-app/test/getMessage/'+msg);
        console.log('executeHelloWorldServiceWithPathParam execution BE done')
    }

    executeHelloWorldServiceWithException() {
        console.log('executeHelloWorldServiceWithException')
        return axios.get('http://localhost:8083/spring-boot-app/test/error');
        console.log('executeHelloWorldServiceWithPathParam execution BE done')
    }
}

export default new HelloWorldService();