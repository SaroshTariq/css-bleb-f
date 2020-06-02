package models;

public class Category {
    int category_id;
    String name;
    String description;
    int projects;

    public Category(int category_id, String name, String description, int projects) {
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.projects = projects;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getProjects() {
        return projects;
    }

    public void setProjects(int projects) {
        this.projects = projects;
    }

    @Override
    public String toString() {
        return "Category{" +
                "category_id=" + category_id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", projects=" + projects +
                '}';
    }
}
