		//定义数据组
		var data1 = [
					{name : 'MISE',value : 55.11,color : '#4572a7'},
					{name : 'Firefox',value : 29.84,color : '#aa4643'},
					{name : 'Chrome',value : 24.88,color : '#89a54e'},
					{name : 'Safari',value : 6.77,color : '#80699b'},
					{name : 'Opera',value : 2.02,color : '#3d96ae'}
				];
		var data2 = [
						{name : 'MISE 6.0',value : 10.80,color : '#4572a7'},
						{name : 'MISE 7.0',value : 7.40,color : '#4572a7'},
						{name : 'MISE 8.0',value : 33.06,color : '#4572a7'},
						{name : 'MISE 9.0',value : 2.81,color : '#4572a7'}
					];
		var data3 = [
						{name : 'Firefox 2.0',value : 0.2,color : '#aa4643'},
						{name : 'Firefox 3.0',value : 0.8,color : '#aa4643'},
						{name : 'Firefox 3.5',value : 1.61,color : '#aa4643'},
						{name : 'Firefox 3.6',value : 13.12,color : '#aa4643'},
						{name : 'Firefox 4.0',value : 5.43,color : '#aa4643'}
					];
		var data4 = [
						{name : 'Chrome 5.0',value : 0.12,color : '#89a54e'},
						{name : 'Chrome 6.0',value : 0.19,color : '#89a54e'},
						{name : 'Chrome 7.0',value : 0.12,color : '#89a54e'},
						{name : 'Chrome 8.0',value : 0.36,color : '#89a54e'},
						{name : 'Chrome 9.0',value : 0.32,color : '#89a54e'},
						{name : 'Chrome 10.0',value : 9.91,color : '#89a54e'},
						{name : 'Chrome 11.0',value : 0.5,color : '#89a54e'},
						{name : 'Chrome 12.0',value : 0.22,color : '#89a54e'}
					];
		var data5 = [
						{name : 'Safari 5.0',value : 4.55,color : '#80699b'},
						{name : 'Safari 4.0',value : 1.42,color : '#80699b'},
						{name : 'Safari Win 5.0',value : 0.23,color : '#80699b'},
						{name : 'Safari 4.1',value : 0.21,color : '#80699b'},
						{name : 'Safari/Maxthon',value : 0.2,color : '#80699b'},
						{name : 'Safari 3.1',value : 0.19,color : '#80699b'}
					];
		var data6 = [
						{name : 'Opera 9.x',value : 0.12,color : '#3d96ae'},
						{name : 'Opera 10.x',value : 0.40,color : '#3d96ae'},
						{name : 'Opera 11.x',value : 1.65,color : '#3d96ae'}
					];

		var data = {
			'All':data1,
			'MISE':data2,
			'Firefox':data3,
			'Chrome':data4,
			'Safari':data5,
			'Opera':data6
		}
		var sub = false;
		function toChart(title,subtitle,d){
			var chart = new iChart.Column2D({
				render : 'canvasDiv',
				data : d,
				title : {
					text : title,
					color : '#3e576f'
				},
				subtitle : {
					text : subtitle,
					color : '#6d869f'
				},
				footnote : {
					text : 'ichartjs.com',
					color : '#909090',
					fontsize : 11,
					padding : '0 38'
				},
				width : 800,
				height : 400,
				label : {
					fontsize:11,
					color : '#666666'
				},
				animation : true,
				animation_duration:700,//700ms完成动画
				shadow : true,
				shadow_blur : 2,
				shadow_color : '#aaaaaa',
				shadow_offsetx : 1,
				shadow_offsety : 0,
				sub_option : {
					listeners : {
						parseText : function(r, t) {
							return t + "%";
						},
						click:function(r,e){
							sub = !sub;
							if(sub)
								toChart(r.get('name')+' market share,April,2011 from 1 to 29 Feb 2012',
										'This is a sample spirit from HighCharts',
										data[r.get('name')]);
							else
								toChart('This is a sample spirit from HighCharts',
										'Browser market share,April,2011 from 1 to 29 Feb 2012',
										data.All);
							
						}
					},
					label : {
						fontsize:11,
						fontweight:600,
						color : '#4572a7'
					},
					border : {
						width : 2,
						color : '#ffffff'
					}
				},
				tip:{
					enable:true,
					listeners:{
						parseText:function(tip,name,value,text){
							if(sub)
							return name+":"+(value/this.get('total') * 100).toFixed(2)+ "%<br/>点击返回总图";
							else
							return name+":"+(value/this.get('total') * 100).toFixed(2)+ "%<br/>点击进入"+name+"详情";
						}
					}
				},
				coordinate : {
					background_color : null,
					grid_color : '#c0c0c0',
					width : 660,
					axis : {
						color : '#c0d0e0',
						width : [0, 0, 1, 0]
					},
					scale : [{
						position : 'left',
						scale_enable : false,
						label : {
							fontsize:11,
							color : '#666666'
						}
					}]
				}
			});
			
			/**
			 *利用自定义组件构造左侧说明文本。
			 */
			chart.plugin(new iChart.Custom({
					drawFn:function(){
						/**
						 *计算位置
						 */	
						var coo = chart.getCoordinate(),
							x = coo.get('originx'),
							y = coo.get('originy'),
							H = coo.height;
						/**
						 *在左侧的位置，设置逆时针90度的旋转，渲染文字。
						 */
						chart.target.textAlign('center')
						.textBaseline('middle')
						.textFont('600 13px Verdana')
						.fillText('Total percent market share',x-40,y+H/2,false,'#6d869f', false,false,false,-90);
						
					}
			}));
			
			chart.draw();
		}
		$(function() {
			toChart('This is a sample spirit from HighCharts',
					'Browser market share,April,2011 from 1 to 29 Feb 2012',
					data.All);
		});