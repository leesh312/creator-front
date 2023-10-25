import './App.scss';
import React, {useState} from "react";
import {
  EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiSideNav, EuiIcon, slugify, EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiMarkdownEditor,
  EuiHeaderSection,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiStat,
  EuiSpacer,
  EuiCard,
  EuiDescriptionList,
} from "@elastic/eui";

function App() {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');
  const [value, setValue] = useState("");

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const createItem = (name: string, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };


  const sideNav = [
    createItem('인플루언서', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch"/>,
      items: [
        createItem('전체'),
        createItem('유튜브'),
        createItem('틱톡'),
        createItem('인스타그램'),
        createItem('아프리카TV'),
        createItem('트위치'),
      ],
    }),
    createItem('분야별 인플루언서', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticStack"/>,
      items: [
        createItem('분야 추가 요청'),
        createItem('음식'),
        createItem('건강/의학'),
        createItem('도서'),
        createItem('교육'),
        createItem('음악'),
        createItem('영화/드라마'),
        createItem('운동'),
        createItem('패션'),
        createItem('뷰티'),
      ],
    }),
    createItem('설정', {
      onClick: undefined,
      icon: <EuiIcon type="logoCloudEnterprise"/>,
      items: [
        createItem('계정 설정'),
        createItem('연락처'),
        createItem('이용권'),
      ],
    }),
  ];

  const favoriteVideoGames = [
    {
      title: '커뮤니케이션',
      description: <>
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
      </>,
    },
    {
      title: '광고효율',
      description: <>
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
        <EuiIcon type="starFilled" />
      </>,
    },
  ];
  return (
    <div className="App">
      <EuiHeader
      >
        <EuiHeaderSection
          grow
        >
          <EuiHeaderSectionItem>
            <EuiHeaderLogo>Creators Club</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem
          >
            <EuiFieldSearch
              placeholder="인플루언서/분야 검색"
              isClearable
              aria-label="Use aria labels when no actual label is in use"
              fullWidth
            />
          </EuiHeaderSectionItem>

        </EuiHeaderSection>
        <EuiHeaderSectionItem>

          <EuiHeaderSectionItemButton disabled aria-label="Sitewide search">
            <EuiIcon type="search" size="m"/>
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton disabled aria-label="Account menu">
            <EuiAvatar isDisabled name="John Username" size="s"/>
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton
            disabled
            aria-label="Apps menu with 1 new app"
            notification="1"
          >
            <EuiIcon type="apps" size="m"/>
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiPage
        paddingSize="none"
        restrictWidth
        grow
      >
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
        <EuiPageBody paddingSize="none" panelled>
          <EuiPageSection>
            <EuiFlexGroup>
              <EuiFlexItem
                grow={false}
              >
                <EuiAvatar
                  size="xl"
                  name="Cat"
                  imageUrl="https://yt3.googleusercontent.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s176-c-k-c0x00ffffff-no-rj"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h3>침착맨</h3>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiStat
                  title="227만명"
                  description="구독자 수"
                  textAlign="left"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiStat
                  title="6,623개"
                  description="동영상"
                  textAlign="left"
                />
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="xl"/>

            <EuiTitle size="xs">
              <h3>리뷰</h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            { [0, 1, 2, 3, 4, ].map(() => (
              <>
                <EuiCard
                  textAlign="left"
                  title="모든 국민은 종교의 자유를 가진다"
                  titleSize="xs"
                  hasBorder
                >
                  타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.<br/> 모든 국민은 종교의 자유를 가진다.<br/><br/>
                  위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.<br/> 국회의원은 법률이 정하는 직을 겸할 수 없다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
                  법률로
                  정한다.
                  <EuiSpacer />
                  <EuiDescriptionList
                    listItems={favoriteVideoGames}
                    type="column"
                    align={"left"}
                    compressed={true}
                  />
                </EuiCard>
                <EuiSpacer/>
              </>
            ))}
            <EuiTitle size="xs">
              <h3>리뷰작성</h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            <EuiMarkdownEditor
              aria-label="EUI markdown editor with no default plugins demo"
              value={value}
              onChange={setValue}
              parsingPluginList={[]}
              processingPluginList={[]}
              uiPlugins={[]}
            />
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}

export default App;
