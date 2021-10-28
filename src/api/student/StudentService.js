import axios from 'axios'

class StudentService {

    retrieveStudents() {
        return axios.get('http://localhost:8083/spring-boot-app/student/all');
    }

    retrieveStudent(sno) {
        return axios.get(`http://localhost:8083/spring-boot-app/student/${sno}`);
    }

    deleteStudent(sno) {
        return axios.delete(`http://localhost:8083/spring-boot-app/student/${sno}`);
    }

    updateStudent(sno, student) {
        return axios.put(`http://localhost:8083/spring-boot-app/student/${sno}`, student);
    }

    createStudent(student) {
        return axios.post(`http://localhost:8083/spring-boot-app/student`, student);
    }

}

export default new StudentService()