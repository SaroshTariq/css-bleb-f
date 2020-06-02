package models;

public class Project {
    int project_id;
    String registration_id;
    String title;
    String overview;
    String photo1;
    String photo2;
    String photo3;
    int category_id;
    int beacon_id;
    String status;
    int students;
    String category;
    String room;

    public Project() {
    }

    public Project(int project_id, String registration_id, String title, String overview, String photo1, String photo2, String photo3,
                   int category_id, int beacon_id, String status, int students, String category, String room) {
        this.project_id = project_id;
        this.registration_id = registration_id;
        this.title = title;
        this.overview = overview;
        this.photo1 = photo1;
        this.photo2 = photo2;
        this.photo3 = photo3;
        this.category_id = category_id;
        this.beacon_id = beacon_id;
        this.status = status;
        this.students = students;
        this.category = category;
        this.room = room;
    }

    public int getProject_id() {
        return project_id;
    }

    public String getRegistration_id() {
        return registration_id;
    }

    public String getTitle() {
        return title;
    }

    public String getOverview() {
        return overview;
    }

    public String getPhoto1() {
        return photo1;
    }

    public String getPhoto2() {
        return photo2;
    }

    public String getPhoto3() {
        return photo3;
    }

    public int getCategory_id() {
        return category_id;
    }

    public int getBeacon_id() {
        return beacon_id;
    }

    public String getStatus() {
        return status;
    }

    public int getStudents() {
        return students;
    }

    public String getCategory() {
        return category;
    }

    public String getRoom() {
        return room;
    }


    @Override
    public String toString() {
        return "Project{" +
                "project_id=" + project_id +
                ", registration_id='" + registration_id + '\'' +
                ", title='" + title + '\'' +
                ", overview='" + overview + '\'' +
                ", status='" + status + '\'' +
                ", students=" + students +
                ", category='" + category + '\'' +
                ", room='" + room + '\'' +
                '}';
    }
}
