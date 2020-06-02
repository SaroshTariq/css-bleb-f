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

import com.airbnb.lottie.LottieAnimationView;

import java.io.InputStream;
import java.util.ArrayList;

import client.ClientConfig;

public class ListItemAdapterPhoto extends RecyclerView.Adapter<ListItemAdapterPhoto.ItemViewHolder> {

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        ImageView ivPhoto;
        LottieAnimationView lavLoading;
        ItemViewHolder(View itemView) {
            super(itemView);
            ivPhoto = itemView.findViewById(R.id.iv_photo);
            lavLoading = itemView.findViewById(R.id.lav_photoloading);
        }
    }

    ArrayList<String> photos;

    ListItemAdapterPhoto(ArrayList<String> photos){
        this.photos = photos;
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

    @Override
    public ListItemAdapterPhoto.ItemViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.listitem_photo, viewGroup, false);
        ListItemAdapterPhoto.ItemViewHolder ivh = new ListItemAdapterPhoto.ItemViewHolder(v);
        return ivh;
    }


    @Override
    public void onBindViewHolder(ListItemAdapterPhoto.ItemViewHolder itemViewHolder, int i) {
        itemViewHolder.ivPhoto.setVisibility(View.GONE);
        itemViewHolder.lavLoading.setAnimation("image_loading.json");
        itemViewHolder.lavLoading.playAnimation();
        itemViewHolder.lavLoading.loop(true);
        ListItemAdapterPhoto.DownloadImageFromInternet di = new ListItemAdapterPhoto.DownloadImageFromInternet((ImageView) itemViewHolder.ivPhoto, itemViewHolder.lavLoading);
        di.execute(ClientConfig.apiUrl+photos.get(i).replace(" ", "%20"));

    }

    @Override
    public int getItemCount() {
        return photos.size();
    }

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