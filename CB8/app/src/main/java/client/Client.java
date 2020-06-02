package client;

import models.Category;
import models.Project;
import models.Student;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Url;

public interface Client {


    @GET("projects/")
    Call<Project[]> getProjects();

    @GET
    Call<Project[]> getProject(@Url String url);

    @GET("categories/")
    Call<Category[]> getCategories();

    @GET
    Call<Student[]> getStudent(@Url String url);

}
