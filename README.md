# ToDoMVC
Tongji University Course Program

# 界面设计：

![image-20210626114634086](https://gitee.com/zhao-bixiao/cloud-image/raw/master/Img/20210626114640.png)

# 基本功能：

1. 添加item：在上方输入框键入内容回车即可添加。

   ![image-20210626120558110](https://gitee.com/zhao-bixiao/cloud-image/raw/master/Img/20210626120558.png)

2. 删除item：在每个item旁都有x按钮可以删除该项

3. 设置完成：点击左边进行中可以设置已完成。

4. 设置全部完成/全部未完成：点击下方的Complete All （当所有任务都是已完成的时候，该按钮会自动转换为Uncomplete All）

5. 清空已完成：当列表中有已完成项的时候，会在Complete All旁边出现清空已完成项按钮。

# 附加功能：

1. todo-item的时间限制：

   由于考虑到这是一个网页项目，我个人认为更适合进行一个短期的规划，因此仅允许用户对今日任务进行规划，在网页启动时将加载今日添加的任务同时自动删除此前其他日期的任务，避免此前的任务对用户使用造成影响。

   因此在界面设计中也专门凸显了今日日期，也是对用户的一种提示。

2. 数据持久化：

   在每次update的时候维护了todo-item的内容、创建时间和优先级。在关闭标签页的时候会使用localStorage进行保存。

3. 长按编辑：选择某一项进行长按可以编辑任务内容。

   ![image-20210626120832738](https://gitee.com/zhao-bixiao/cloud-image/raw/master/Img/20210626120832.png)

4. 优先级设置：在新增加项目的时候可以设置项目的优先级，由于项目限制只进行短期规划，只设置了两个优先级，个人认为过多的优先级反而会造成完成任务时的疑惑，并在下方可以通过标签选择仅显示某一优先级的项目。高优先级的项目将以红色显示，方便用户区分。

   ![image-20210626120631886](https://gitee.com/zhao-bixiao/cloud-image/raw/master/Img/20210626120632.png)
