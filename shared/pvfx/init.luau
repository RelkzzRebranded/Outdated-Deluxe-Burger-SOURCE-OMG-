local pvfx = ((type(shared.pvfx) == "table" and type(shared.pvfx.emit) == "function" and shared.pvfx) or(type(shared.vfx) == "table" and type(shared.vfx.emit) == "function" and shared.vfx) or(type(_G.PhaseVFX) == "table" and type(_G.PhaseVFX.emit) == "function" and _G.PhaseVFX) or require(game: GetService("ReplicatedStorage"): WaitForChild("PhaseVFXRuntime")))

local function emit(toEmit, options: {})
	pvfx.emit(toEmit, options)
end
return {
    emit = emit
}
