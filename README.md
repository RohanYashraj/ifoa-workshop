# AI for Actuaries — From Foundations to AI Agents

Workshop notebooks for the IFoA / IAI session *"AI for Actuaries — From Foundations to AI Agents"*
(24 July 2026, Four Points by Sheraton, Whitefield, Bangalore).

Author: **Dr Rohan Yashraj Gupta** (FIA, FIAI), with Satya Sai Mudigonda and Kasyap · License: CC BY-NC 4.0

> All data is hypothetical — **ABC Insurer** is a fictional entity for teaching only.
> The running story: Priya Nair (pricing, ABC General) must explain the price of policy
> **ABC-MOT-047231** — a 7-year-old SUV, Tier-2, 35% NCB — so her chief actuary Arjun Mehta can sign it.

The current teaching material is in **`notebooks_v3/`**. (`notebooks/` and `notebooks_v2/` are earlier editions.)

| Notebook | What it does | Needs API key? |
|----------|--------------|:--------------:|
| `01_genai_basics.ipynb` | First Gemini calls, CCCE prompting, structured JSON, hallucination on cue | ✅ |
| `02_models_as_tools.ipynb` | Synthetic ABC Motor data, leakage trap, Poisson GLM, XGBoost, lift table, SHAP, fairness | ❌ (runs offline) |
| `03_first_agent.ipynb` | First Agno agent: one tool + the ReAct loop | ✅ |
| `04_pricing_logic_explainer.ipynb` | Three tools, a governed system prompt, a guardrail that kills a hallucination | ✅ |
| `05_actuarial_analyst_agent.ipynb` | Capstone: models-as-tools, RAG retriever, a reviewer agent | ✅ |
| `06_case_study_starter.ipynb` | Case-study scaffold (TODOs only) | — |

---

## Run locally with `uv`

The whole environment is managed by [`uv`](https://docs.astral.sh/uv/). Dependencies are pinned in
`pyproject.toml` + `uv.lock`, so the setup is reproducible — **you do not need the `%pip install` cells at
the top of each notebook** (those are for Google Colab and are harmless no-ops locally).

### 1. Prerequisites

- **`uv`** — install with `curl -LsSf https://astral.sh/uv/install.sh | sh` (or `brew install uv`).
- **Python 3.12** — `uv` will fetch it automatically if missing (pinned in `.python-version`).
- **macOS only — OpenMP runtime for XGBoost:**
  ```bash
  brew install libomp
  ```
  Without it, `import xgboost` fails with *"Library not loaded: @rpath/libomp.dylib"*.
  (Linux users get OpenMP via the XGBoost wheel; nothing extra needed.)

### 2. Create the environment

From the repo root:

```bash
uv sync
```

This creates `.venv/` and installs every dependency exactly as locked. Verify:

```bash
uv run python -c "import numpy, pandas, sklearn, statsmodels, xgboost, shap, google.genai, agno; print('all good')"
```

### 3. Add your Gemini API key

Notebooks 01, 03, 04, 05 call the Gemini API. Get a key from
[Google AI Studio](https://aistudio.google.com/apikey) and put it in the (git-ignored) `.env` file:

```dotenv
GOOGLE_API_KEY=your-key-here
```

Notebook 02 needs **no** key and runs fully offline.

### 4. Launch JupyterLab

```bash
uv run --env-file .env jupyter lab
```

`--env-file .env` loads `GOOGLE_API_KEY` into the environment, so the auth cell in each notebook
(`assert "GOOGLE_API_KEY" in os.environ`) passes. Open any notebook in `notebooks_v3/` and
**Run All** — the kernel is the project's `.venv`, so all imports are already satisfied.

> Prefer VS Code / Cursor? Open the folder and select the `.venv` interpreter as the notebook kernel;
> add `GOOGLE_API_KEY` to your shell or a `.env` the editor loads.

---

## Model pin

All API notebooks pin `MODEL = "gemini-3.1-flash-lite"` (never `latest`) for reproducibility. If that
id is not yet available on your account, change the `MODEL = …` line to a current model
(e.g. `gemini-2.5-flash`) in each notebook's setup cell.

## Managing dependencies

```bash
uv add <package>        # add a dependency (updates pyproject.toml + uv.lock + .venv)
uv remove <package>     # remove one
uv sync                 # re-create .venv to match the lockfile
uv run <cmd>            # run a command inside the environment
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `xgboost … libomp.dylib … no such file` (macOS) | `brew install libomp` |
| `AssertionError` in the auth cell | Set `GOOGLE_API_KEY` in `.env` and launch with `uv run --env-file .env jupyter lab` |
| API `404 NOT_FOUND` on the model | Change the `MODEL` line to a model available on your account |
| `%pip install` cell is slow | Skip it — dependencies are already in the `uv` environment |
