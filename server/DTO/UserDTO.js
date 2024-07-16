class UserDto {
    constructor(user) {
        this.employerId = user.employerId;
        this.idProof = user.idProof;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.employeeType = user.employeeType;
        this.phone = user.phone;
        this.email = user.email;
    }
}

module.exports = UserDto;
