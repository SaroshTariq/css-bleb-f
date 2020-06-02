package models;

public class Student {
    int student_id;
    String registration_id;
    String display_picture;
    String first_name;
    String last_name;
    String email;
    String mobile;
    String date_of_birth;
    String postal_address;
    String overview;
    String project_id;
    String password;
    String project;

    public Student(int student_id, String registration_id, String display_picture, String first_name, String last_name, String email, String mobile, String date_of_birth, String postal_address, String overview, String project_id, String password, String project) {
        this.student_id = student_id;
        this.registration_id = registration_id;
        this.display_picture = display_picture;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.mobile = mobile;
        this.date_of_birth = date_of_birth;
        this.postal_address = postal_address;
        this.overview = overview;
        this.project_id = project_id;
        this.password = password;
        this.project = project;
    }

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public String getRegistration_id() {
        return registration_id;
    }

    public void setRegistration_id(String registration_id) {
        this.registration_id = registration_id;
    }

    public String getDisplay_picture() {
        return display_picture;
    }

    public void setDisplay_picture(String display_picture) {
        this.display_picture = display_picture;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getPostal_address() {
        return postal_address;
    }

    public void setPostal_address(String postal_address) {
        this.postal_address = postal_address;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getProject_id() {
        return project_id;
    }

    public void setProject_id(String project_id) {
        this.project_id = project_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "Student{" +
                "student_id=" + student_id +
                ", registration_id='" + registration_id + '\'' +
                ", display_picture='" + display_picture + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", date_of_birth='" + date_of_birth + '\'' +
                ", postal_address='" + postal_address + '\'' +
                ", overview='" + overview + '\'' +
                ", project_id='" + project_id + '\'' +
                ", password='" + password + '\'' +
                ", project='" + project + '\'' +
                '}';
    }
}
