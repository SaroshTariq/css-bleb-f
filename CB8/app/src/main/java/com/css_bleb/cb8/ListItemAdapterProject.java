package com.css_bleb.cb8;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;

import java.io.InputStream;
import java.util.List;

import client.ClientConfig;
import models.Project;

public abstract class ListItemAdapterProject extends RecyclerView.Adapter<ListItemAdapterProject.ItemViewHolder> {

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        TextView tvTitle;
        TextView tvCategory;
        ImageView ivCover;
        LottieAnimationView lavLoading;
        ItemViewHolder(View itemView) {
            super(itemView);
            tvTitle = itemView.findViewById(R.id.tv_title);
            tvCategory = itemView.findViewById(R.id.tv_category);
            ivCover = itemView.findViewById(R.id.iv_coverphoto);
            lavLoading = itemView.findViewById(R.id.lav_photoloading);
        }
    }

    List<Project> projects;

    ListItemAdapterProject(List<Project> projects){
        this.projects = projects;
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

    @Override
    public ItemViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.listitem_project, viewGroup, false);
        ItemViewHolder ivh = new ItemViewHolder(v);
        return ivh;
    }

    @Override
    public void onBindViewHolder(ItemViewHolder itemViewHolder, int i) {
        itemViewHolder.ivCover.setVisibility(View.GONE);
        itemViewHolder.lavLoading.setAnimation("image_loading.json");
        itemViewHolder.lavLoading.playAnimation();
        itemViewHolder.lavLoading.loop(true);
        itemViewHolder.tvTitle.setText(projects.get(i).getTitle());
        itemViewHolder.tvCategory.setText(projects.get(i).getCategory());
        ListItemAdapterProject.DownloadImageFromInternet di = new ListItemAdapterProject.DownloadImageFromInternet((ImageView) itemViewHolder.ivCover, itemViewHolder.lavLoading);
        di.execute(ClientConfig.apiUrl+projects.get(i).getPhoto1().replace(" ", "%20"));
        itemViewHolder.tvTitle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onItemClick(projects.get(i).getProject_id()+"");
            }
        });
        itemViewHolder.tvCategory.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onItemClick(projects.get(i).getProject_id()+"");
            }
        });
        itemViewHolder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onItemClick(projects.get(i).getProject_id()+"");
            }
        });
    }

    @Override
    public int getItemCount() {
        return projects.size();
    }

    abstract void onItemClick(String item_id);

    private class DownloadImageFromInternet extends AsyncTask<String, Void, Bitmap> {
        ImageView imageView;
        LottieAnimationView lavLoading;
        public DownloadImageFromInternet(ImageView imageView, LottieAnimationView lavLoading) {
            this.imageView = imageView;
            this.lavLoading = lavLoading;
            this.lavLoading.setVisibility(View.VISIBLE);
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
            imageView.setVisibility(View.VISIBLE);
            this.lavLoading.setVisibility(View.GONE);
        }
    }
}