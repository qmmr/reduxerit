const removeIn = (o, target) => {
  if(target.length === 0)
    return {...o}
  let cur = target.shift()
  if (target.length === 0) {
    const newO = {...o}
    delete newO[cur]
    return newO;
  }
  else {
    return {...o, [cur]: (setIn(o[cur], target))}
  }
}

const updateIn = (o, target, modifier) => {
  let cur;
  if(typeof target === 'string' )
    cur = target
  else {
    cur = target.shift()
  }

  if (target.length === 0 ||  typeof target === 'string') {
    return {...o, [cur]: modifier(o[cur])}
  }
  else {
    return {...o, [cur]: (updateIn(o[cur], target, modifier))}
  }
}

export const setIn = (o, target, val) => updateIn(o, target, () => val)


export const utils = {
  removeIn,
  updateIn,
  setIn
}



export const set = (state, action) => target => (setIn(state,target,action.payload ))
export const update = (state, action) => (target, updateCB) => (updateIn(state,target, (oldValue) => updateCB(oldValue, action.payload) ))
export const merge = (state, action) => target => updateIn(state, target, (obj) => ({...obj, ...action.payload})  )
export const remove = (state) => target => removeIn(state, target)

//array
export const push = (state, action) => target => updateIn(state, target, (arr) => arr.push(action.payload))
export const removeIdx = (state, action) => target => updateIn(
  state, target,
  arr => {
    const res = [...arr];
    res.splice(action.payload,1);
    return res;
  }
);
