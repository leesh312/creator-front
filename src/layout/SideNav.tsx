import {EuiIcon, EuiPageSidebar, EuiSideNav, slugify} from "@elastic/eui";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState("");

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };
  const createItem = (name: string, data = {}) => {
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    createItem('유튜브 광고', {
      onClick: undefined,
      items: [
        createItem('광고 채널 찾기', {
          onClick: () => { navigate("/categories/entertainment") },
        }),
        createItem('광고 영상 모아보기', {
          onClick: () => { navigate("/categories/entertainment") },
        }),
      ]
    }),
    createItem('카테고리별 광고 영상/채널', {
      onClick: undefined,
      items: [
        createItem('엔터테인먼트', {
          onClick: () => { navigate("/categories/entertainment") },
        }),
        createItem('여행/이벤트', {
          onClick: () => { navigate("/categories/travel") },
        }),
        createItem('게임', {
          onClick: () => { navigate("/categories/gaming") },
        }),
        createItem('코메디', {
          onClick: () => { navigate("/categories/comedy") },
        }),
        createItem('음악', {
          onClick: () => { navigate("/categories/music") },
        }),
        createItem('애완동물/동물', {
          onClick: () => { navigate("/categories/pet") },
        }),
        createItem('영화/애니메이션', {
          onClick: () => { navigate("/categories/film") },
        }),
        createItem('인물/블로그', {
          onClick: () => { navigate("/categories/people") },
        }),
        createItem('뉴스/정치', {
          onClick: () => { navigate("/categories/news") },
        }),
        createItem('자동차/교통', {
          onClick: () => { navigate("/categories/autos") },
        }),
        createItem('스포츠', {
          onClick: () => { navigate("/categories/sports") },
        }),
        createItem('노하우/스타일', {
          onClick: () => { navigate("/categories/style") },
        }),
        createItem('과학기술', {
          onClick: () => { navigate("/categories/science") },
        }),
        createItem('교육', {
          onClick: () => { navigate("/categories/education") },
        }),
      ],
    }),
  ];

  return (
    <EuiPageSidebar paddingSize="l">
      <EuiSideNav
        aria-label="Complex example"
        mobileTitle=""
        toggleOpenOnMobile={toggleOpenOnMobile}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={sideNav}
        style={{width: 192}}
      />
    </EuiPageSidebar>
  )
}

export default SideNav;
