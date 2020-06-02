package com.css_bleb.cb8;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.InputStream;
import java.util.List;

import client.ClientConfig;
import models.Student;

public abstract class ListItemAdapterStudent extends RecyclerView.Adapter<ListItemAdapterStudent.ItemViewHolder> {

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        TextView tvName;
        TextView tvEmail;
        ImageView ivDP;
        Button btnView;
        ItemViewHolder(View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tv_name);
            tvEmail = itemView.findViewById(R.id.tv_email);
            ivDP = itemView.findViewById(R.id.iv_dp);
            btnView = itemView.findViewById(R.id.btn_view);
        }
    }

    List<Student> students;

    ListItemAdapterStudent(List<Student> students){
        this.students = students;
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

    @Override
    public ListItemAdapterStudent.ItemViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.listitem_student, viewGroup, false);
        ListItemAdapterStudent.ItemViewHolder ivh = new ListItemAdapterStudent.ItemViewHolder(v);
        return ivh;
    }

    @Override
    public void onBindViewHolder(ListItemAdapterStudent.ItemViewHolder itemViewHolder, int i) {
        itemViewHolder.tvName.setText(students.get(i).getFirst_name()+" "+students.get(i).getLast_name());
        itemViewHolder.tvEmail.setText(students.get(i).getEmail());
        ListItemAdapterStudent.DownloadImageFromInternet di = new ListItemAdapterStudent.DownloadImageFromInternet((ImageView) itemViewHolder.ivDP);
        di.execute(ClientConfig.apiUrl+students.get(i).getDisplay_picture().replace(" ", "%20"));


        itemViewHolder.btnView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onItemClick(students.get(i).getStudent_id()+"");
            }
        });
    }

    @Override
    public int getItemCount() {
        return students.size();
    }

    abstract void onItemClick(String item_id);

    private class DownloadImageFromInternet extends AsyncTask<String, Void, Bitmap> {
        ImageView imageView;
        public DownloadImageFromInternet(ImageView imageView) {
            this.imageView = imageView;
        }

        protected Bitmap doInBackground(String... urls) {
            String imageURL = urls[0];
            Bitmap bimage = null;
            try {
                InputStream in = new java.net.URL(imageURL).openStream();
                bimage = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error Message", e.getMessage());
                e.printStackTrace();
            }
            return bimage;
        }

        protected void onPostExecute(Bitmap result) {
            imageView.setImageBitmap(result);
        }
    }
}