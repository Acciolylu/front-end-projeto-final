package br.edu.ifba.demo.frontend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/relatorios")
public class RelatorioController {
    @Autowired

    @GetMapping("/")
    public ModelAndView index2() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("relatorios/index2");
        mv.addObject("data", new int[]{10, 9, 9, 9, 9, 9,9, 10, 9, 9, 8, 10, 9,10,8});
        return mv;
    }
}