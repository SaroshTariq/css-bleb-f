package com.css_bleb.cb8;

import android.annotation.SuppressLint;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.List;

import models.Category;

public abstract class ListItemAdapterCategory extends RecyclerView.Adapter<ListItemAdapterCategory.ItemViewHolder> {

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        CheckBox cbName;
        TextView tvName;
        CardView cvCategoryListItem;
        LinearLayout l1L1;
        ItemViewHolder(View itemView) {
            super(itemView);
            cbName = itemView.findViewById(R.id.cb_name);
        }
    }

    List<Category> categories;
    boolean[] isChecked;
    ListItemAdapterCategory(List<Category> categories){
        this.categories = categories;
        isChecked = new boolean[categories.size()];
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

    @Override
    public ListItemAdapterCategory.ItemViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.listitem_category, viewGroup, false);
        ListItemAdapterCategory.ItemViewHolder ivh = new ListItemAdapterCategory.ItemViewHolder(v);
        return ivh;
    }

    @SuppressLint("ResourceAsColor")
    @Override
    public void onBindViewHolder(ListItemAdapterCategory.ItemViewHolder itemViewHolder, int i) {
        itemViewHolder.cbName.setText(categories.get(i).getName());
        itemViewHolder.cbName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onItemClick(categories.get(i).getCategory_id()+"");
            }
        });

    }

    @Override
    public int getItemCount() {
        return categories.size();
    }


    abstract void onItemClick(String item_id);

}