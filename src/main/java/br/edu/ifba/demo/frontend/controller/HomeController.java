package br.edu.ifba.demo.frontend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {
    @Autowired

    @GetMapping("/home")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }
    @GetMapping("/formLivro")
    public ModelAndView index2() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("formLivro");
        return mv;
    }

    @GetMapping("/formGenero")
    public ModelAndView index3() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("formGenero");
        return mv;
    }
}
