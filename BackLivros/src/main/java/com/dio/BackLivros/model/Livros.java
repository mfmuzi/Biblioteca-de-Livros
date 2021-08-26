package com.dio.BackLivros.model;

import javax.persistence.*;

@Entity
@Table(name="livros")
public class Livros {

    private long id;
    private String titulo;
    private String autor;
    private String editora;
    private String anoLancamento;
    private String descricao;
    private String urlFoto;
    private String genero;


    public Livros(){

    }


    public Livros(long id, String titulo, String autor, String editora, String anoLancamento, String descricao, String urlFoto, String genero) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoLancamento = anoLancamento;
        this.descricao = descricao;
        this.urlFoto = urlFoto;
        this.genero = genero;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(name="titulo")
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    @Column(name="autor")
    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    @Column(name="editora")
    public String getEditora() {return editora;}

    public void setEditora(String editora) {this.editora = editora;}

    @Column(name="anoLancamento")
    public String getAnoLancamento() {
        return anoLancamento;
    }

    public void setAnoLancamento(String anoLancamento) {
        this.anoLancamento = anoLancamento;
    }

    @Column(name="descricao")
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Column(name="urlFoto")
    public String getUrlFoto() {
        return urlFoto;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    @Column(name="genero")
    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    @Override
    public String toString(){
        return "Livros [id=" + id +", titulo=" + titulo +" , autor=" + autor +", urlFoto=" + urlFoto +"," +
                " anoLancamento=" + anoLancamento +", descricao=" + descricao +", genero=" + genero +"]";
    }





}

