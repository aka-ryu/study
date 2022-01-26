package com.ryu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ryu.domain.BoardVO;

import com.ryu.mapper.BoardMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService{

	private BoardMapper mapper;
	
	@Override
	public List<BoardVO> getList() {
		return mapper.getList();
	}
}
