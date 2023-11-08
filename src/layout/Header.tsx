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
import React, {useEffect, useMemo, useState} from "react";
import {useSearch} from "../api/apis";
import {useNavigate} from "react-router-dom";
import {css} from '@emotion/react';
import _ from "lodash"

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const {data: searchResult, isLoading: isLoadingSearch} = useSearch(searchQuery)

  const debouncedSetSearchQuery = useMemo(
    () => _.debounce((value: string) => { setSearchQuery(value)}, 300),
    []
  );

  const memoSearchQuery = useMemo(() => {
    return searchResult?.items.map((item) => {
      return {
        label: item.name,
        prepend: (<><img src={item.thumbnailUrl} style={{ "width": "36px" }} /></>),
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
            구독자수: {option.followerCount}
          </small>
        </EuiText>
      </>
    );
  };

  const onChangeSelect = (_options: EuiSelectableOption<any>, _event: any, selected: EuiSelectableOption<any>) => {
    const data = selected.data as SearchChannelResponseItem
    // TODO 검색어 선택한 것으로 바꾸기
    navigate(`/channels/${data.channelId}`)
  }

  const searchValueExists = true

  return (
    <EuiHeader>
      <EuiHeaderSection
        grow
      >
        <EuiHeaderSectionItem>
          <EuiHeaderLogo>Creators Club</EuiHeaderLogo>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem
        >
          <EuiSelectableTemplateSitewide
            isLoading={isLoadingSearch}
            options={memoSearchQuery}
            // listProps={{
            //   className: 'customListClass',
            //   css: css`
            //       .euiSelectableTemplateSitewide__optionMeta--PINK {
            //           font-weight: ${euiTheme.font.weight.medium};
            //           color: ${euiTheme.colors.accentText};
            //       }
            //   `,
            // }}
            onChange={onChangeSelect}
            searchProps={{
              onChange: (v) => { debouncedSetSearchQuery(v) },
            }}
            renderOption={renderCountryOption}
            popoverProps={{
              className: 'customPopoverClass',
            }}
            popoverButton={<EuiIcon type="search" size="m"/>}
            popoverButtonBreakpoints={['xs', 's']}
            popoverFooter={searchValueExists &&
              <EuiText color="subdued" size="xs">
                <EuiFlexGroup
                  alignItems="center"
                  gutterSize="s"
                  responsive={false}
                  wrap
                >
                  <EuiFlexItem grow={false}>
                    {searchValueExists && <EuiLink>검색 결과 전체 보기</EuiLink>}
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiText>
            }
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
  )
}

export default Header