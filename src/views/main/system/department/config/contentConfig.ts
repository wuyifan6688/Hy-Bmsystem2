const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '100px' },
    {
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      width: '100px',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '上级部门',
      prop: 'parentId',
      width: '100px',
      slotName: 'top'
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '200px' }
  ]
}
export default contentConfig
