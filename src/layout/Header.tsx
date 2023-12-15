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
  EuiTextArea,
  EuiDescribedFormGroup,
  EuiButton,
  EuiFormRow,
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
  EuiBadge,
  EuiLink,
  EuiText,
  EuiHighlight,
  EuiSelectableOption,
} from "@elastic/eui";
import React, {SyntheticEvent, useEffect, useMemo, useRef, useState} from "react";
import {useSearch} from "../api/apis";
import {useNavigate} from "react-router-dom";
import {css} from '@emotion/react';
import _ from "lodash"
import {parseCount} from "../util/utils";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const {data: searchResult, isLoading: isLoadingSearch} = useSearch(searchQuery)
  const searchRef = useRef()

  const debouncedSetSearchQuery = useMemo(
    () => _.debounce((value: string) => {
      setSearchQuery(value)
    }, 300),
    []
  );

  const memoSearchQuery = useMemo(() => {
    return searchResult?.items.map((item) => {
      return {
        label: item.name,
        prepend: (<><img src={item.thumbnailUrl} style={{"width": "36px"}}/></>),
        append: <EuiBadge>YOUTUBE</EuiBadge>,
        data: item,
      }
    }) || []
  }, [searchResult])

  const renderCountryOption = (
    option: EuiSelectableOption<any>,
    searchValue: string
  ) => {
    return (
      <>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        <EuiText size="xs" color="subdued" className="eui-displayBlock">
          <small>
            구독자 {parseCount(option.followerCount)}
          </small>
        </EuiText>
      </>
    );
  };

  const onChangeSelect = (_options: EuiSelectableOption<any>, _event: SyntheticEvent, selected: EuiSelectableOption<any>) => {
    const data = selected.data as SearchChannelResponseItem
    // TODO 검색어 선택한 것으로 바꾸기
    console.log(_event)

    _event.target.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ESCAPE', bubbles: true })
    );
    navigate(`/channels/${data.channelId}`)
  }

  return (
    <EuiHeader>
      <EuiFlexGroup
        justifyContent={"center"}
        alignItems={"center"}
      >
        <EuiFlexItem grow={false}>
          <div style={{width: "1480px", maxWidth: "1480px"}}>
            <EuiHeaderSection>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiHeaderSectionItem>
                    <EuiHeaderLogo>Creators Club</EuiHeaderLogo>
                  </EuiHeaderSectionItem>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFlexGroup
                    justifyContent={"center"}
                  >
                    <EuiFlexItem
                      grow={false}
                    >
                      <EuiHeaderSectionItem>
                        <EuiSelectableTemplateSitewide
                          style={{ width: "400px" }}
                          isLoading={isLoadingSearch}
                          options={memoSearchQuery}
                          onChange={onChangeSelect}
                          searchProps={{
                            placeholder: "유튜버/키워드 검색",
                            onChange: (v) => {
                              debouncedSetSearchQuery(v)
                            },
                          }}
                          renderOption={renderCountryOption}
                          popoverButton={<EuiIcon type="search" size="m"/>}
                          popoverButtonBreakpoints={['xs', 's']}
                        />
                      </EuiHeaderSectionItem>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiHeaderSection>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiHeader>
  )
}

export default Header