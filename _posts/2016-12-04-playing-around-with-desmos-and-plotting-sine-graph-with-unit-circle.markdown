---
layout: post
title:  "新玩具 Desmos 与正弦函数图像"
date:   2016-12-04 16:00:53
author: abrasumente
categories: 二次元
cover:  "assets/desmos/banner.jpg"
excerpt: 用 Desmos 可以作出许多有趣的交互图像。
---

## 0. Desmos 是？

拖动紫色的点来体验一下：
<iframe src="https://www.desmos.com/calculator/zsd9pilokm?embed" width="736px" height="500px" style="border: none" frameBorder="0" markdown="0"> </iframe>

可以看出，Desmos 就是用来画交互式图像的。

## 1. 入门
这个可以看官方的视频教学，这里我选出一些必要的 (YouTube)：

1. [函数](http://learn.desmos.com/functions)
2. [列表](http://learn.desmos.com/lists)
3. [点](http://learn.desmos.com/points)
4. [限制](http://learn.desmos.com/restrictions)
5. [滑块](http://learn.desmos.com/sliders)

每个视频一分钟，五个都很直观，简单到关掉声音也能看懂（雾）。

如果看不了，也可以看[文字版](https://desmos.s3.amazonaws.com/Desmos_User_Guide_ZH-CN.pdf)。但是因为没有视频来的那么简单，所以不推荐。

## 2. 用单位圆画正弦函数图像

### 2.0 原型
参见湘教版高中必修（一）第 39 页顶图（那个图实在太反人类）。或下图（来自玄数）：
![单位圆和正弦函数图像]({{ site.url }}/assets/desmos/unit-circle-and-sine-graph.gif)

### 2.1 画图
设旋转角度为 $\alpha$，圆心横坐标（随意选取）$C_x=-\frac{\pi}{2}$。然后从易到难开始画吧。

#### 2.1.0  画 $y = \pm1$
$$y = [1, {-1}]$$
![y=+-1]({{ site.url }}/assets/desmos/lines-of-pm1.png)
上面是用列表的写法。它等价于下面两条：
$$y=1$$$$y=-1$$

#### 2.1.1 画单位圆
直接上圆的方程：
$$x^2+y^2=1$$
![圆心在原点的圆]({{ site.url }}/assets/desmos/unit-circle-sitting-on-the-origin.png)
然而圆心落在原点，与期望不符。于是将它向左平移：
$$(x-C_x)^2+y^2=1$$
![平移之后的圆]({{ site.url }}/assets/desmos/well-placed-unit-circle.png)
平移多少随你定，看着舒服就行。

#### 2.1.2 画终边和三角函数线

##### 2.1.2.0 交点坐标

先求出终边和单位圆的交点坐标会方便许多。设终边与单位圆相交与 $P$ 点。明显它的纵坐标为 $\sin{\alpha}$。至于横坐标，由于单位圆刚才已经向左平移，$P$ 点也要随之平移。综上就有：
$$P(\cos{\alpha}+C_x,\sin{\alpha})$$
放到 Desmos 就是：
$$P_x=\cos{\alpha}+C_x$$ $$P_y=\sin{\alpha}$$
然后我们可以画出交点 $P$：
$$(P_x,P_y)$$
![pi/2时P点位置]({{ site.url }}/assets/desmos/drawing-point-p.png)

##### 2.1.2.1 作正弦线
$$x=P_x$$
![半吊子正弦线]({{ site.url }}/assets/desmos/horrible-sine-line.png)

这能叫正弦线吗！？限制一下：
$$x=P_x\{0<y<P_y\}$$
![2/3吊子正弦线]({{ site.url }}/assets/desmos/not-so-perfect-sine-line.png)

这个就比刚才的好多了。可是还是有一点问题，就是当 $P_y<0$ 时，限制条件就会变成这种鬼畜东西：$0<y<-1$。所以，$0$ 和 $P_y$ 应该取小的放在左边，大的放在右边。就有：
$$x=P_x\{\min(0,P_y)<y<\max(0,P_y)\}$$
![完美正弦线]({{ site.url }}/assets/desmos/sine-line.png)

##### 2.1.2.2 作终边
可以拿一次函数来作：
$$y=x$$
![y=x]({{ site.url }}/assets/desmos/simple-y-equals-to-x.png)

斜率就是$\tan\alpha$ 了：
$$y=(\tan{\alpha})x$$
![调整斜率]({{ site.url }}/assets/desmos/adjusting-the-slope.png)
向左平移：
$$y=(\tan{\alpha})(x-C_x)$$
![平移直线]({{ site.url }}/assets/desmos/shift-the-line-to-where-it-should-be.png)

为避免它割过整个圆，再作出一点限制，让它定义域限制在**圆心**和**交点 $P$** 之间：
$$y=(\tan{\alpha})(x-C_x)\{\min (C_x,P_x)\leq{x}\leq\max (C_x,P_x)\}$$
![限制直线范围]({{ site.url }}/assets/desmos/some-restrictions-on-the-line.png)

#### 2.1.2 画正弦图像
从简单开始：
$$f(x)=\sin{x}$$
![y=sinx]({{ site.url }}/assets/desmos/original-graph-of-sine.png)

再一步步限制：
$$f(x)=\sin{x} \{ 0 \leq x \leq \alpha\}$$
![限制正弦函数图像]({{ site.url }}/assets/desmos/put-sine-in-jail.png)

作出图像上相应的点：
$$(\alpha,f(\alpha))$$
![正弦函数图像上的点]({{ site.url }}/assets/desmos/corresponding-point-on-the-sine-graph.png)

#### 2.1.3 交点 $P$ 与图像上对应点连线
$$y=P_y\{ P_x \leq x \leq \alpha \}$$
![连线]({{ site.url }}/assets/desmos/connect-unit-circle-and-sine-graph-together.png)

#### 2.1.4 图像上对应点纵坐标
跟上面正弦线一样：
$$x=\alpha\{\min(0,P_y)<y<\max(0,P_y)\}$$
所以可以合并起来写：
$$x=[P_x,\alpha]\{\min(0,P_y)<y<\max(0,P_y)\}$$
![平移正弦线]({{ site.url }}/assets/desmos/a-fancy-line.png)

### 2.2 成品
图像上的点可以拖动。

<iframe src="https://www.desmos.com/calculator/nys9tokhfn?embed" width="736px" height="300px" style="border: 1px solid #ccc" frameBorder="0" markdown="0"> </iframe>


### 2.3 改进版

<iframe src="https://www.desmos.com/calculator/ttpm67hjrx?embed" width="736px" height="300px" style="border: 1px solid #ccc" frameBorder="0" markdown="0"> </iframe>


## 3. 总结
事实证明这个玩意非常好玩....最后送上一个 $y=A\sin(\omega{x}+\phi)$

<iframe src="https://www.desmos.com/calculator/ltxpsskwft?embed" width="736px" height="300px" style="border: 1px solid #ccc" frameBorder="0" markdown="0"> </iframe>
