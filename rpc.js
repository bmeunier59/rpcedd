$(document).ready(function(){

	// creation du sommaire
	$(".ecran.sommaire>div").wrap(function(index){
		$(this).addClass("contenu");
		var chaine;
		if(index < 3){
			chaine = '<div class="cel cel-'+(index+1)+'"></div>';
		}
		else if( index == 3 ){
			chaine = '<div class="cel cel-centre"></div>';
		}
		else{
			chaine = '<div class="cel cel-'+index+'"></div>';
			
		}
		return chaine;
	});
	$('.ecran.sommaire>.ligne').wrapAll('<div class="wrapper"></div>');

	// creation des satellites
	var satellites = $('.ecran.satellite');
	satellites.each(function(index,value){
		var selecteur='.cel-'+(index+1)+' h2';
		$(value).prepend('<div class="toolbar"><div class="btnFermerSat">X</div></div>')
		.children()
		.wrapAll('<div class="col col-droite"></div>');
		
		$(value).prepend('<div class="col col-gauche"><h3 class="titre-sat">'+$(selecteur).html()+'</h3></div>')
		.children()
		.wrapAll('<div class="ligne"></div>')
		.parent()
		.wrap('<div class="wrapper"></div>');
	});

	// creation des sous-satellites
	var modales = $('.modale');
	modales.each(function(index,value){
		var satName = $(value).attr("class").split(' ')[1];
		var itemsatName = $(value).attr("class").split(' ')[2];
		//console.log('.satellite .'+satName+' .'+itemsatName);
		var titre = $('.satellite.'+satName+' .'+itemsatName).html();
		$(value).prepend('<div class="ligne titre-modale">'+titre+'</div>')
		.prepend('<div class="toolbar"><div class="btnFermerModale" >X</div></div>')
		.children()
		.wrapAll('<div class="wrapper-modale"></div>');
	});
	
	//gestion des liens et boutons

	$('.cel').on("click",function(e){
		e.preventDefault();
		var jqElem = $(this);
		if(jqElem.hasClass("cel-centre"))
			return;
		$('.satellite').css({zIndex:0});
		var selecteur = ".ecran.sat-"+jqElem.attr("class").slice(-1);
		var sat = $(selecteur);
		$('.ecran.sommaire').css({transition: 'transform 500ms ease',transform:'translateX(-110%)'});
		sat.css({display:'block',left:0,top:0,zIndex:999});
		
		
	});

	$('.itemsat').on('click',function(e){
		var jqElem = $(this);
		var satName = "sat-"+jqElem.parents('.ecran').attr("class").slice(-1);
		var itemName = "itemsat-"+jqElem.attr("class").slice(-1);
		var selecteur = ".modale."+satName+"."+itemName;
		$(selecteur).before('<div class="overlay"></div>');
		$(selecteur).css({display:'flex'});
	});

	$('.btnFermerSat').on("click",function(e){
		var sat = $(this).parents('.ecran');
		$('.ecran.sommaire').css({transition: 'transform 500ms ease',transform:'translateX(0)'});
		sat.css({display:'none'});//sat.css({zIndex:999});
	});

	$('.btnFermerModale').on("mousedown touchstart",function(e){
		e.preventDefault();
		var modale = $(this).parents('.modale');
		//var selecteur = "."+modale.attr("class").slice(7,12);
		modale.hide();
		$('.overlay').remove();
	});

	


});