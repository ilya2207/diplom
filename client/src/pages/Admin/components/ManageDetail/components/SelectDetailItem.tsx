import React from 'react'
import { ICategoryItem } from 'types/category.types'
import { IModel } from 'types/model.types'

interface ISelectCategory {
  key: 'category'
  items: ICategoryItem[]
}

const SelectDetailRelationCategory: React.FC<ISelectCategory> = ({ items, key }) => {
  return <div>SelectDetailItem</div>
}

interface ISelectModel {
  key: 'model'
  items: IModel[]
}

const SelectDetailRelationModel: React.FC<ISelectModel> = ({ items, key }) => {
  return <div></div>
}

export default SelectDetailRelationCategory
