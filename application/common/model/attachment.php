<?php
 class attachmentModel extends Model { protected $imgext = array('jpg', 'png', 'gif', 'bmp', 'jpeg'); public function add($zym_10) { $zym_9 = $this->insert($zym_10); $this->imageWater($zym_10); return $zym_9; } public function edit($zym_10) { $zym_9 = $this->update($zym_10); $this->imageWater($zym_10); return $zym_9; } public function del($zym_11) { $zym_12 = $this->where($zym_11)->find(); if ($zym_12) { $zym_9 = $this->where($zym_11)->delete(); storage::remove($zym_12['path']); return $zym_9; } return false; } public function imageWater($zym_5) { if (in_array($zym_5['ext'], $this->imgext)) { $zym_6 = new image(storage::getPath($zym_5['path'])); if (C('water_type')==1){ $zym_6->water(PT_ROOT.'/'.C('water_image'),C('water_position'),C('water_alpha')); }elseif(C('water_type')==2){ $zym_6->text(C('water_text'),PT_ROOT.'/public/font/'.C('water_font'),C('water_fontsize'),C('water_color'),C('water_position')); } storage::write($zym_5['path'], $zym_6->save()); } } public function getlist() { $zym_7 = (array)$this->select(); foreach ($zym_7 as &$zym_8) { $zym_8['size']=file_size_format($zym_8['size'],2); $zym_8['create_username'] = dc::get('user', $zym_8['create_user_id'], 'name'); $zym_8['create_time'] = $zym_8['create_time'] ? date('Y-m-d H:i', $zym_8['create_time']) : ''; } return $zym_7; } }
?>